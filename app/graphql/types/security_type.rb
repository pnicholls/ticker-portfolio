class Types::SecurityType < Types::BaseObject
  field :id, Int, null: false
  field :name, String, null: false
  field :symbol, String, null: false

  field :quote, QuoteType, null: false do
    description ''
  end
end
