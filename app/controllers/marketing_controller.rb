class MarketingController < ApplicationController
  skip_before_action :authenticate!

  def show
    @account = Account.find_by(email: 'marketing@useticker.com')
    @portfolio = @account.portfolios.first
  end
end
