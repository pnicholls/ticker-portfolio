class Security < ApplicationRecord
  has_many :portfolio_securities
  has_many :portfolios, through: :portfolio_securities

  validates :name, presence: true, allow_blank: true
  validates :symbol, presence: true

  scope :order_by_name, -> { order(:name) }

  def fetch
    [quote, stats, charts].each(&:fetch)
  end

  def did_change
    TickerSchema.subscriptions.trigger("securityUpdated", { id: id }, self)
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
