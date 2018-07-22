class DashboardController < ApplicationController
  def show
    @portfolio = current_account.portfolios.order_by_name.first
  end
end
