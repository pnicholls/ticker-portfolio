require 'test_helper'

class SessionsControllerTest < ApplicationIntegrationTestCase
  test 'creating a session' do
    account = accounts(:peter_nicholls)

    post session_path, params: { account: { email: account.email, password: 'password' } }
    assert_redirected_to root_path

    follow_redirect!
    assert_select 'a', /Log out/
  end

  test 'attempting to create a session with invalid credentials' do
    post session_path, params: { account: { email: 'unknown', password: 'password' } }
    assert_response :ok

    assert_select 'div', /Incorrect email or password./
  end

  test 'destroying a session' do
    sign_in accounts(:peter_nicholls)

    delete session_path
    assert_redirected_to root_path
  end
end
