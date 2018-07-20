class MarketingController < ApplicationController
  prepend_before_action :redirect_to_dashboard_if_authenticated

  skip_before_action :authenticate

  def show
    @portfolio = Portfolio.default
  end

  private

  def redirect_to_dashboard_if_authenticated
    authenticate
    redirect_to dashboard_path if signed_in?
  end
end
