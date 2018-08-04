class Types::PortfolioType < Types::BaseObject
  field :id, Int, null: false
  field :name, String, null: false
  field :editable, Boolean, null: false
  field :marketing, Boolean, null: false
  field :securities, [SecurityType], null: false
  field :transactions, [TransactionType], null: false

  def securities
    object.portfolio_securities
  end

  def editable
    return false unless current_account

    current_account.can_edit?(object)
  end

  def marketing
    object.account.marketing?
  end

  private

  def current_account
    context[:current_account]
  end
end
