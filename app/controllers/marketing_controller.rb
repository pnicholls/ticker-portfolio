class MarketingController < ApplicationController
  def show
    @portfolio = Portfolio.default
  end
end
