require 'test_helper'

class DashboardControllerTest < ApplicationIntegrationTestCase
  setup { sign_in accounts(:peter_nicholls) }

  test 'show dashboard' do
    get root_path

    assert_select 'a', /Log out/
  end
end
