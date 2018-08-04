module PortfolioSecurities
  class Position
    attr_reader :portfolio_security

    def initialize(portfolio_security)
      @portfolio_security = portfolio_security
    end

    def shares
      return nil if transactions.blank?

      buy_transactions.map(&:shares).sum - sell_transactions.map(&:shares).sum
    end

    def cost_basis
    end

    def market_value
      return nil if shares.nil?

      shares * quote.latest_price
    end

    def gain
    end

    def gain_percent
    end

    def days_gain
    end

    def overall_return
    end

    def overall_return_percent
    end

    def presence
      return self if quote
    end

    private

    def transactions
      @transactions ||= portfolio_security.transactions
    end

    def buy_transactions
      transactions.select { |transaction| transaction.buy? }
    end

    def sell_transactions
      transactions.select { |transaction| transaction.sell? }
    end

    def security
      portfolio_security.security
    end

    def quote
      security.quote
    end
  end
end
