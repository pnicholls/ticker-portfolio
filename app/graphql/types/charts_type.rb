class Types::ChartsType < Types::BaseObject
  field :sixMonth, ChartType, null: true

  def six_month
    object.six_months
  end
end
