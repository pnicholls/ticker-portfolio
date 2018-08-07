class ApplicationController < ActionController::Base
  include Authenticate
  include Analytics

  helper_method :current_account
end
