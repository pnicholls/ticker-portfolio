class Types::QueryType < Types::BaseObject
  field :portfolio, Types::PortfolioType, null: true do
    description 'Find a Portfolio by ID'
    argument :id, ID, required: true
  end

  def portfolio(args)
    Portfolio.includes(:securities).find(args[:id]).tap(&:refresh)
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
