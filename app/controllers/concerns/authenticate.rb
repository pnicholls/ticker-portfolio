module Authenticate
  extend ActiveSupport::Concern

  included do
    include ByCookie

    before_action :authenticate!
  end

  private

  def authenticate!
    if authenticate_with_cookies
      # Great! You're in
    elsif !performed?
      request_cookie_authentication
    end
  end

  def authenticate
    authenticate_with_cookies
  end

  def authenticated(account, by:)
    benchmark "  #{authentication_identification(account)} by #{by}" do
      set_authenticated_by(by)
      set_current_account(account)
    end
  end

  def set_authenticated_by(method)
    @authenticated_by = method.to_s.inquiry
  end

  def authenticated_by
    @authenticated_by
  end

  def set_current_account(account)
    @current_account ||= account
  end

  def current_account
    @current_account
  end

  def signed_in?
    @current_account.present?
  end

  def authentication_identification(account)
    "Authorized #{account.email}, Account##{account.id}"
  end
end
