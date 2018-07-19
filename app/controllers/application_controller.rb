class ApplicationController < ActionController::Base
  include Authenticate

  helper_method :current_account
end
