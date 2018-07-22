class MarketingController < ApplicationController
  skip_before_action :authenticate

  def show
    @portfolio = Portfolio.default
  end
end
