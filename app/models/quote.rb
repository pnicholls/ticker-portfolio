class Quote
  attr_reader :security

  def initialize(security)
    @security = security
  end

  def latest_price
    data.fetch('latestPrice', nil)
  end

  def change_percent
    data.fetch('changePercent', nil)
  end

  def market_cap
    data.fetch('marketCap', nil)
  end

  def latest_volume
    data.fetch('latestVolume', nil)
  end

  def open
    data.fetch('open', nil)
  end

  def high
    data.fetch('high', nil)
  end

  def low
    data.fetch('low', nil)
  end

  def refresh
    return unless refresh_at.nil? || (refresh_at && (refresh_at < Time.current))

    Rails.cache.write(refresh_at_key, 3.minutes.from_now)
    FetchSecurityQuoteJob.perform_later(security)
  end

  def fetch
    uri = URI("https://api.iextrading.com/1.0/stock/#{security.symbol}/quote")
    response = Net::HTTP.get(uri)
    json = JSON.parse(response)

    cache_data(json)
  end

  def presence
    return self if data.present?
  end

  private

  def data
    Rails.cache.read(cache_key) || {}
  end

  def cache_data(value)
    Rails.cache.write(cache_key, value, expires_in: 5.minutes)
  end

  def refresh_at
    Rails.cache.read(refresh_at_key) || nil
  end

  def cache_key
    "stock/#{security.symbol}/quote"
  end

  def refresh_at_key
    "stock/#{security.symbol}/quote/refresh_at"
  end
end
