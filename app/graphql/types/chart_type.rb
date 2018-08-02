class Types::ChartType < Types::BaseObject
  field :data, [ChartDataType], null: true
  field :changePercent, Float, null: false
end
