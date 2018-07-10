class PortfolioSecurity < ApplicationRecord
  belongs_to :portfolio
  belongs_to :security
end
