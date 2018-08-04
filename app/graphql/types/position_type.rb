class Types::PositionType < Types::BaseObject
  field :shares, Int, null: true
  field :costBasis, Float, null: true
  field :marketValue, Float, null: true
  field :gain, Float, null: true
  field :gainPercent, Float, null: true
  field :daysGain, Float, null: true
  field :overallReturn, Float, null: true
  field :overallReturnPercent, Float, null: true
end
