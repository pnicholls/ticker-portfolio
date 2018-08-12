class FetchSecurityDataJob < ApplicationJob
  queue_as :default

  def perform(security)
    sleep(4)
    security.fetch
    security.did_refresh
  end
end
