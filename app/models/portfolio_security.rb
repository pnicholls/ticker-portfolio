class PortfolioSecurity < ApplicationRecord
  belongs_to :portfolio
  belongs_to :security

  validates :security, uniqueness: { scope: :portfolio }

  def transactions
    Transaction.where(portfolio: portfolio, security: security)
  end
end
