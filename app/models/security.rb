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
    subscribers = trigger_change_notification
    enqueue_fetch_data_job_if_required if subscribers > 0
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

  private

  def trigger_change_notification
    TickerSchema.subscriptions.trigger("securityUpdated", { id: id }, self)
  end

  def enqueue_fetch_data_job_if_required
    FetchSecurityDataJob.new(self).enqueue(wait: 5.minutes)
  end
end
