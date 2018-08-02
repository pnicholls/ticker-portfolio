module Securities
  class Stats
    attr_reader :security

    def initialize(security)
      @security = security
    end

    def week_52_high
      data.fetch('week52high', nil)
    end

    def week_52_low
      data.fetch('week52low', nil)
    end

    def earnings_per_share
      data.fetch('EPS', nil)
    end

    def ttm_eps
      data.fetch('ttmEPS', nil)
    end

    def beta
      data.fetch('beta', nil)
    end

    def refresh
      return unless refresh_at.nil? || (refresh_at && (refresh_at < Time.current))

      Rails.cache.write(refresh_at_key, 3.minutes.from_now)
      FetchSecurityDataJob.perform_later(security)
    end

    def fetch
      uri = URI("https://api.iextrading.com/1.0/stock/#{security.symbol}/stats")
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
      "stock/#{security.symbol}/stats"
    end

    def refresh_at_key
      "stock/#{security.symbol}/stats/refresh_at"
    end
  end
end
