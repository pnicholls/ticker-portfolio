require 'test_helper'

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  test 'registering a new account' do
    post registration_path, params: {
      account: {
        person_attributes: {
          name: 'new-account',
        },
        email: 'new@account.com',
        password: 'password',
      },
    }

    assert_redirected_to dashboard_path
    follow_redirect!

    assert_select 'a', /Log out/
  end

  test 'attempting to register with incomplete credentials' do
    post registration_path, params: {
      account: { person_attributes: { name: 'invalid-account' }, email: 'invalid-email' },
    }

    assert_response :ok

    assert_select 'div', /There were problems creating your account./
  end
end
