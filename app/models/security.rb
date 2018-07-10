class Security < ApplicationRecord
  validates :name, presence: true
  validates :symbol, presence: true
end
