require 'active_support/concern'

module Analytics
  extend ActiveSupport::Concern

  included do
    include Analytics::Intercom
  end
end
