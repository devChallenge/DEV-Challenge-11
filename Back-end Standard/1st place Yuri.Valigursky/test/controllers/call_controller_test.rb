require 'test_helper'

class CallControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get call_index_url
    assert_response :success
  end

end
