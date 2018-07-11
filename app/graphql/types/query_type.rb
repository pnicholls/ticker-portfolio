class Types::QueryType < Types::BaseObject
  field :portfolio, PortfolioType, null: true do
    description 'Find a Portfolio by ID'
    argument :id, ID, required: true
  end

  def portfolio(args)
    Portfolio.find(args[:id])
  end
end
