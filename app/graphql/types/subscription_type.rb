class Types::SubscriptionType < GraphQL::Schema::Object
  field :portfolio_updated, Types::PortfolioType, null: false,
    description: "A portfolio updated" do
      argument :id, ID, required: true
    end

  def portfolio_updated(args)
    Portfolio.find(args[:id])
  end

  field :security_updated, Types::SecurityType, null: true do
    description 'Returns a collection of securities'
    argument :id, ID, required: false
  end

  def security_updated(args)
    Security.find(args[:id])
  end
end
