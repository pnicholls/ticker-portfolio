class Types::SecurityType < Types::BaseObject
  field :id, Int, null: false
  field :name, String, null: false
  field :symbol, String, null: false

  field :quote, QuoteType, null: true do
    description ''
  end

  field :stats, StatsType, null: true do
    description ''
  end

  field :charts, ChartsType, null: false do
    description ''
  end

  def id
    object.is_a?(Security) ? object.id : object.security.id
  end

  def name
    object.is_a?(Security) ? object.name : object.security.name
  end

  def symbol
    object.is_a?(Security) ? object.symbol : object.security.symbol
  end

  def quote
    object.is_a?(Security) ? object.quote.presence : object.security.quote.presence
  end

  def stats
    object.is_a?(Security) ? object.stats.presence : object.security.stats.presence
  end

  def charts
    object.is_a?(Security) ? object.charts.presence : object.security.charts.presence
  end
end
