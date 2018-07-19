require 'test_helper'

class MarketingControllerTest < ApplicationIntegrationTestCase
  test 'show marketing' do
    get root_path

    assert_select 'a', /Log in/
  end
end
