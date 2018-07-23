class Types::PortfolioType < Types::BaseObject
  field :id, Int, null: false
  field :name, String, null: false
  field :editable, Boolean, null: false
  field :securities, [SecurityType], null: false

  def editable
    return false unless current_account

    current_account.can_edit?(object)
  end

  private

  def current_account
    context[:current_account]
  end
end
