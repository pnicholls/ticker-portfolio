class Types::QueryType < Types::BaseObject
  field :portfolio, Types::PortfolioType, null: true do
    description 'Find a Portfolio by ID'
    argument :id, ID, required: true
  end

  def portfolio(args)
    Portfolio.includes(:securities).find(args[:id]).tap(&:refresh)
  end

  field :security, Types::SecurityType, null: true do
    description 'Find a Security'
    argument :id, ID, required: false
    argument :symbol, String, required: false
  end

  def security(args)
    case args
    when ->(arguments) { arguments[:symbol].present? }
      Security.find_by(symbol: args[:symbol])&.tap(&:refresh)
    when ->(arguments) { arguments[:id].present? }
      Security.find(args[:id])&.tap(&:refresh)
    end
  end

  field :securities, [Types::SecurityType], null: true do
    description 'Returns a collection of securities'
  end

  def securities
    query = Security.order(:symbol)

    Rails.cache.fetch(query.cache_key) do
      query
    end
  end
end
