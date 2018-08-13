class Types::TransactionType < Types::BaseObject
  field :id, Int, null: false
  field :type, String, null: false
  field :date, String, null: false
  field :shares, Int, null: false
  field :price, Float, null: false
  field :security, Types::SecurityType, null: false

  def type
    object.transaction_type
  end
end
