require 'test_helper'

class AccountTest < ActiveSupport::TestCase
  test 'email is valid' do
    account = Account.new(email: 'not.valid')
    account.valid?

    assert_equal 'Email is invalid or already taken', account.errors[:email].join(', ')
  end

  test 'portfolio is created when an account is created' do
    account = Account.create(email: 'example@email.com', password: 'password')

    assert_equal ['Portfolio'], account.portfolios.pluck(:name)
  end

  test 'can edit?' do
    account = accounts(:marketing)
    other_account = accounts(:peter_nicholls)

    assert_equal true, account.can_edit?(account.portfolios.first)
    assert_equal false, other_account.can_edit?(account.portfolios.first)
  end
end
