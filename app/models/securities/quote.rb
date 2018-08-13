module Securities
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

    def avg_total_volume
      data.fetch('avgTotalVolume', nil)
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

    def pe_ratio
      data.fetch('peRatio', nil)
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

    def cache_key
      "stock/#{security.symbol}/quote"
    end
  end
end
