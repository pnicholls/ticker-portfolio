class Types::SecurityType < Types::BaseObject
  field :id, Int, null: false
  field :name, String, null: false
  field :symbol, String, null: false

  field :quote, QuoteType, null: true do
    description ''
  end

  def quote
    object.quote.presence
  end
end
