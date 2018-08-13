class FetchSecurityDataJob < ApplicationJob
  queue_as :default

  def perform(security)
    security.fetch
    security.did_change
  end
end
