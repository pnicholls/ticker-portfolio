class Account < ApplicationRecord
  include Accounts::Intercom

  has_one :person

  has_many :portfolios

  has_secure_password

  accepts_nested_attributes_for :person
  accepts_nested_attributes_for :portfolios

  validates :email, presence: true, uniqueness: true, format: {
    with: /\A[^@\s]+@[^@\s]+\z/, allow_blank: true
  }

  def can_edit?(portfolio)
    portfolio.account == self
  end
end
