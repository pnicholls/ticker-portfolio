require 'active_support/concern'

module Analytics::Mixpanel
  extend ActiveSupport::Concern

  included do
    def track_account_creation(account)
      MixpanelJob.perform_later('alias', alias_id, account.id) if alias_id
      MixpanelJob.perform_later('track', account.id, 'Created an Account', default_properties, ip)
    end

    def track_person(person)
      attributes = {
        '$email' => person.account.email,
        '$name' => person.name,
        '$created' => person.account.created_at.to_s,
        '$ip' => ip,
      }

      MixpanelJob.perform_later('people_set', person.account.id, attributes, ip)
    end

    def track_login(account)
      MixpanelJob.perform_later('track', account.id, 'Logged in', default_properties, ip)
    end

    def track_logout(account)
      MixpanelJob.perform_later('track', account.id, 'Logged out', default_properties, ip)
    end
  end

  def mixpanel_token
    Rails.application.credentials[Rails.env.to_sym][:mixpanel][:token]
  end

  private

  def mixpanel_cookie
    cookie = cookies["mp_#{mixpanel_token}_mixpanel"]
    return {} unless cookie.present?

    JSON.parse(cookie)
  end

  def alias_id
    mixpanel_cookie.fetch('distinct_id', nil)
  end

  def ip
    request.remote_ip
  end

  def default_properties
    properties = {}
    properties.merge!(referring_properties) if referring_properties
  end

  def referring_properties
    return unless mixpanel_cookie.present?

    {
      '$initial_referring_domain' => mixpanel_cookie.fetch('$initial_referring_domain', nil),
      '$initial_referrer' => mixpanel_cookie.fetch('$initial_referrer', nil),
    }
  end
end
