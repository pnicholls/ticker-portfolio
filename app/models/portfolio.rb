class Portfolio < ApplicationRecord
  belongs_to :account

  validates :name, presence: true

  has_many :portfolio_securities
  has_many :securities, through: :portfolio_securities

  scope :order_by_name, -> { order(:name) }

  def self.default
    where(default: true).first
  end

  def editable
    !default?
  end

  def refresh
    securities.each(&:refresh)
  end
end
