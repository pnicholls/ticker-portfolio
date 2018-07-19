class ApplicationIntegrationTestCase < ActionDispatch::IntegrationTest
  def sign_in(account)
    post session_path, params: {
      account: { email: account.email, password: 'password' },
    }
  end
end
