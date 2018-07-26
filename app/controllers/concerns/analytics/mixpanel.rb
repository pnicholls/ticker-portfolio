require 'active_support/concern'

module Analytics::Mixpanel
  extend ActiveSupport::Concern

  included do
    def track_account_creation(account)
      properties = default_properties
      properties['Securities'] = account.securities.order_by_name.pluck(:name).join(', ')
      properties['Securities Count'] = account.securities.count
      MixpanelJob.perform_later('track', alias_id, 'Created an Account', properties, ip)
      MixpanelJob.perform_later('alias', account.id, alias_id)
    end

    def track_person(person)
      attributes = {
        '$email' => person.account.email,
        '$name' => person.name,
        '$created' => person.account.created_at.to_s,
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
    request.headers.fetch('HTTP_X_FORWARDED_FOR', '').split(',').first
  end

  def default_properties
    properties = {}
    properties.merge!(referring_properties) if referring_properties
    properties
  end

  def referring_properties
    return {} unless mixpanel_cookie.present?

    {
      '$initial_referring_domain' => mixpanel_cookie.fetch('$initial_referring_domain', nil),
      '$initial_referrer' => mixpanel_cookie.fetch('$initial_referrer', nil),
    }
  end
end
