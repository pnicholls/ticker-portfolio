class Types::QueryType < Types::BaseObject
  field :portfolio, Types::PortfolioType, null: true do
    description 'Find a Portfolio by ID'
    argument :id, ID, required: true
  end

  def portfolio(args)
    Portfolio.includes(:securities).find(args[:id])
  end

  field :security, Types::SecurityType, null: true do
    description 'Find a Security'
    argument :id, ID, required: false
    argument :symbol, String, required: false
  end

  def security(args)
    case args
    when ->(arguments) { arguments[:symbol].present? }
      Security.find_by(symbol: args[:symbol])
    when ->(arguments) { arguments[:id].present? }
      Security.find(args[:id])
    end
  end

  field :securities, [Types::SecurityType], null: true do
    description 'Returns a collection of securities'
    argument :id, [ID], required: false
  end

  def securities(*args)
    return all_securities if args.fetch(0, {}).empty?

    ids = args.fetch(0, {}).fetch(:id, nil)
    if ids.present?
      Security.order(:symbol).where(id: ids)
    end
  end

  private

  def all_securities
    query = Security.order(:symbol)
    Rails.cache.fetch(query.cache_key) do
      query
    end
  end
end
