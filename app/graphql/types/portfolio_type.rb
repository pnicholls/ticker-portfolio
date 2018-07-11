class Types::PortfolioType < Types::BaseObject
  field :name, String, null: false
  field :securities, [SecurityType], null: false
  field :lastPrice, Int, null: true
end
