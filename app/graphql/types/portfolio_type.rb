class Types::PortfolioType < Types::BaseObject
  field :id, Int, null: false
  field :name, String, null: false
  field :securities, [SecurityType], null: false
end
