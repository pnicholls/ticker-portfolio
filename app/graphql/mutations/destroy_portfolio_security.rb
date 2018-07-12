class Mutations::DestroyPortfolioSecurity < Mutations::BaseMutation
  argument :portfolioID, ID, required: true
  argument :securityID, ID, required: true

  field :portfolio, Types::PortfolioType, null: true
  field :security, Types::SecurityType, null: true
  field :errors, [String], null: false

  def resolve(portfolio_id:, security_id:)
    portfolio = Portfolio.find(portfolio_id)
    security = Security.find(security_id)
    portfolio_security = PortfolioSecurity.find_by(portfolio: portfolio, security: security)

    if portfolio_security.destroy
      {
        portfolio: portfolio,
        security: security,
        errors: [],
      }
    else
      {
        portfolio: nil,
        security: nil,
        errors: portfolio_security.errors.full_messages,
      }
    end
  end
end
