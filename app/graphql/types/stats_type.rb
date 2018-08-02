class Types::StatsType < Types::BaseObject
  field :week52High, Float, null: true
  field :week52Low, Float, null: true
  field :ttmEPS, Float, null: true
  field :beta, Float, null: true

  def week52_high
    object.week_52_high
  end

  def week52_low
    object.week_52_low
  end
end
