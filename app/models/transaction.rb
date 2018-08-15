class Transaction < ApplicationRecord
  enum transaction_type: [:buy, :sell]

  belongs_to :portfolio
  belongs_to :security

  validates :transaction_type, presence: true
  validates :date, presence: true
  validates :shares, presence: true
  validates :price, presence: true
end
