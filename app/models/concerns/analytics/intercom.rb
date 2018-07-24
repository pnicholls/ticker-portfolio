require 'active_support/concern'

module Analytics::Intercom
  extend ActiveSupport::Concern

  included do
    def intercom_user_hash
      OpenSSL::HMAC.hexdigest('sha256', secret, email.to_s)
    end
  end

  private

  def secret
    Rails.application.credentials[Rails.env.to_sym][:intercom][:secret_key]
  end
end
