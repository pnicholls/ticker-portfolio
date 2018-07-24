class SessionsController < ApplicationController
  before_action :sign_out, only: %i(new)
  skip_before_action :authenticate!, only: %i(new create)

  layout 'authentication'

  def create
    account = Account.find_by(email: params[:account][:email])
    if account&.authenticate(params[:account][:password])
      sign_in(account)
    end

    if signed_in?
      track_login(account)
      redirect_to root_path
    else
      flash.now[:error] = 'Incorrect email or password.'
      render :new
    end
  end

  def destroy
    track_logout(current_account)
    sign_out

    respond_to do |format|
      format.html { redirect_to root_path }
    end
  end
end
