class FetchSecurityDataJob < ApplicationJob
  queue_as :default

  def perform(security)
    security.fetch
  end
end
