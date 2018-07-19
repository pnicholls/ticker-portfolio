class Account < ApplicationRecord
  has_one :person

  has_secure_password

  accepts_nested_attributes_for :person

  validates :email, presence: true, uniqueness: true, format: {
    with: /\A[^@\s]+@[^@\s]+\z/, allow_blank: true
  }
end
