class Types::PortfolioType < Types::BaseObject
  field :id, Int, null: false
  field :name, String, null: false
  field :default, Boolean, null: false
  field :editable, Boolean, null: false
  field :securities, [SecurityType], null: false
end
