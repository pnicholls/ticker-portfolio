module Authenticate::ByCookie
  private

  def authenticate_with_cookies
    authenticate_with_identity_cookie || sign_in_with_remember_cookie
  end

  def authenticate_with_identity_cookie
    if account = find_verified_account('identity cookie', cookies.signed[:identity_id])
      authenticated account, by: :cookie
    end
  end

  def sign_in_with_remember_cookie
    if account = find_verified_account('remember identity cookie', cookies.signed[:remember_identity_id])
      authenticated account, by: :cookie
    end
  end

  def find_verified_account(_, identity_id)
    Account.where(id: identity_id).first if identity_id
  end

  def request_cookie_authentication
    redirect_to new_session_path, alert: 'Authentication required'
  end

  def sign_in(account)
    set_identity_cookies(account.id)
    authenticate_with_cookies
  end

  def sign_out
    set_identity_cookies(nil)
  end

  def set_identity_cookies(identity)
    cookies.signed[:identity_id] = identity
    cookies.permanent.signed[:remember_identity_id] = identity
  end
end
