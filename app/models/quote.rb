class Quote
  attr_reader :security

  def initialize(security)
    @security = security
  end

  def refresh
    data
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

  private

  def data
    Rails.cache.fetch(cache_key, expires_in: 5.minutes) do
      fetch_quote
    end
  end

  def cache_key
    "stock/#{security.symbol}/quote"
  end

  def fetch_quote
    uri = URI("https://api.iextrading.com/1.0/stock/#{security.symbol}/quote")
    response = Net::HTTP.get(uri)
    JSON.parse(response)
  end
end
