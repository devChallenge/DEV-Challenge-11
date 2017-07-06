require 'test_helper'

class ResetControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get reset_index_url
    assert_response :success
  end

end
