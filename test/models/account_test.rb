require 'test_helper'

class AccountTest < ActiveSupport::TestCase
  test 'email is valid' do
    account = Account.new(email: 'not.valid')
    account.valid?

    assert_equal 'Email is invalid or already taken', account.errors[:email].join(', ')
  end

  test 'can edit?' do
    account = accounts(:marketing)
    other_account = accounts(:peter_nicholls)

    assert_equal true, account.can_edit?(account.portfolios.first)
    assert_equal false, other_account.can_edit?(account.portfolios.first)
  end
end
