class Security < ApplicationRecord
  validates :name, presence: true, allow_blank: true
  validates :symbol, presence: true

  delegate :refresh, to: :quote
  delegate :fetch, to: :quote

  scope :order_by_name, -> { order(:name) }

  def quote
    @quote ||= Quote.new(self)
  end
end
