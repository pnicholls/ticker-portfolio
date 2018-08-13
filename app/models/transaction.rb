class Transaction < ApplicationRecord
  enum transaction_type: [:buy, :sell]

  belongs_to :portfolio
  belongs_to :security
end
