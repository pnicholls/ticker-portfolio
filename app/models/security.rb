class Security < ApplicationRecord
  validates :name, presence: true, allow_blank: true
  validates :symbol, presence: true

  scope :order_by_name, -> { order(:name) }

  def refresh
    [quote, stats, charts].each(&:refresh)
  end

  def fetch
    [quote, stats, charts].each(&:fetch)
  end

  def quote
    @quote ||= Securities::Quote.new(self)
  end

  def stats
    @stats ||= Securities::Stats.new(self)
  end

  def charts
    @charts ||= Securities::Charts.new(self)
  end
end
