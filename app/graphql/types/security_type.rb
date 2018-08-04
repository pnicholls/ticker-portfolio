class Types::SecurityType < Types::BaseObject
  field :id, Int, null: false
  field :name, String, null: false
  field :symbol, String, null: false

  field :quote, Types::QuoteType, null: true do
    description ''
  end

  field :stats, Types::StatsType, null: true do
    description ''
  end

  field :charts, Types::ChartsType, null: false do
    description ''
  end

  field :position, Types::PositionType, null: false do
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
    object.is_a?(Security) ? object.charts : object.security.charts
  end

  def position
    return nil if object.is_a?(Security)

    object.position.presence
  end
end
