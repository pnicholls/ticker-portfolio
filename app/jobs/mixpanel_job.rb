class MixpanelJob < ApplicationJob
  queue_as :default

  def perform(action, *args)
    case action
    when 'alias'
      Rails.logger.info "  Tracking alias #{args}"
      tracker.alias(*args)
    when 'track'
      Rails.logger.info "  Tracking event #{args}"
      tracker.track(*args)
    when 'people_set'
      Rails.logger.info "  Tracking person #{args}"
      tracker.people.set(*args)
    end
  end

  private

  def tracker
    ::Mixpanel::Tracker.new mixpanel_token
  end

  def mixpanel_token
    Rails.application.credentials[Rails.env.to_sym][:mixpanel][:token]
  end
end
