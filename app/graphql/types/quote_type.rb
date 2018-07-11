class Types::QuoteType < Types::BaseObject
  field :latestPrice, Float, null: true
  field :changePercent, Float, null: true
  field :marketCap, Float, null: true
  field :latestVolume, Int, null: true
  field :open, Float, null: true
  field :high, Float, null: true
  field :low, Float, null: true
end
