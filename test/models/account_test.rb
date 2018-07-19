require 'test_helper'

class AccountTest < ActiveSupport::TestCase
  test 'email is valid' do
    account = Account.new(email: 'not.valid')
    account.valid?

    assert_equal 'Email is invalid or already taken', account.errors[:email].join(', ')
  end
end
