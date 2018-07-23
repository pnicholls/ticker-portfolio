class RegistrationsController < ApplicationController
  skip_before_action :authenticate!, only: %i(new create)

  before_action :sign_out

  layout 'authentication'

  def new
    @account = Account.new
    @account.build_person
    @account.portfolios.build(name: 'Portfolio', security_ids: params[:securities])
  end

  def create
    @account = Account.new(permitted_params)

    if @account.save
      sign_in(@account)
      redirect_to root_path
    else
      flash.now[:error] = 'There were problems creating your account.'
      render :new
    end
  end

  private

  def permitted_params
    params.require(:account).permit(
      :email,
      :password,
      person_attributes: [
        :name,
      ],
      portfolios_attributes: [
        :name,
        portfolio_securities_attributes: [
          :security_id,
        ],
      ],
    )
  end

  def ensure_not_authenticated
    redirect_to root_path if current_account
  end
end
