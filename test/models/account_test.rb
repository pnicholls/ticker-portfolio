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
end
