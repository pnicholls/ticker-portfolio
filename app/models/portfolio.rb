class Portfolio < ApplicationRecord
  belongs_to :account

  validates :name, presence: true

  has_many :portfolio_securities
  has_many :securities, through: :portfolio_securities

  accepts_nested_attributes_for :portfolio_securities

  scope :order_by_name, -> { order(:name) }
end
