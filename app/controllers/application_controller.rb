class ApplicationController < ActionController::Base
  include Authenticate
  include Analytics

  helper_method :current_account
  helper_method :mixpanel_token
end
