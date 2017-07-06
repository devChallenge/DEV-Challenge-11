require 'test_helper'

class RegisterControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get register_index_url
    assert_response :success
  end

end
