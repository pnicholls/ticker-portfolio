module Securities
  class Charts
    class SixMonths
      attr_reader :security

      def initialize(security)
        @security = security
      end

      def data
        Rails.cache.read(cache_key) || []
      end

      def change_percent
        return 0.0 unless data.present?

        start_close = data.first.fetch('close', nil)
        end_close = data.last.fetch('close', nil)

        return 0.0 unless start_close && end_close

        (end_close - start_close) / end_close
      end

      def refresh
        return unless refresh_at.nil? || (refresh_at && (refresh_at < Time.current))

        Rails.cache.write(refresh_at_key, 3.minutes.from_now)
        FetchSecurityDataJob.perform_later(security)
      end

      def fetch
        uri = URI("https://api.iextrading.com/1.0/stock/#{security.symbol}/chart/6m")
        response = Net::HTTP.get(uri)
        json = JSON.parse(response)

        cache_data(json)
      end

      def presence
        return self if data.present?
      end

      private

      def cache_data(value)
        Rails.cache.write(cache_key, value, expires_in: 5.minutes)
      end

      def refresh_at
        Rails.cache.read(refresh_at_key) || nil
      end

      def cache_key
        "stock/#{security.symbol}/chart/6m?chartSimplify=true"
      end

      def refresh_at_key
        "stock/#{security.symbol}/chart/6m?chartSimplify=true/refresh_at"
      end
    end

    attr_reader :security

    delegate :refresh, to: :six_months
    delegate :fetch, to: :six_months

    def initialize(security)
      @security = security
    end

    def six_months
      @chart ||= SixMonths.new(security)
    end
  end
end
