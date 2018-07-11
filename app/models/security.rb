class Security < ApplicationRecord
  validates :name, presence: true
  validates :symbol, presence: true

  delegate :refresh, to: :quote

  def quote
    @quote ||= Quote.new(self)
  end
end
