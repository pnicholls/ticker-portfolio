class Account < ApplicationRecord
  has_one :person

  has_many :portfolios

  has_secure_password

  before_create :create_portfolio

  accepts_nested_attributes_for :person

  validates :email, presence: true, uniqueness: true, format: {
    with: /\A[^@\s]+@[^@\s]+\z/, allow_blank: true
  }

  def can_edit?(portfolio)
    portfolio.account == self
  end

  private

  def create_portfolio
    return unless portfolios.empty?

    portfolios.build(name: 'Portfolio')
  end
end
