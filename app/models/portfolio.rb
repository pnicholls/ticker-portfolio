class Portfolio < ApplicationRecord
  validates :name, presence: true

  has_many :portfolio_securities
  has_many :securities, through: :portfolio_securities

  def self.default
    where(default: true).first
  end

  def refresh
    securities.each(&:refresh)
  end
end
