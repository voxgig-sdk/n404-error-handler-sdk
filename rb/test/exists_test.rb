# N404ErrorHandler SDK exists test

require "minitest/autorun"
require_relative "../N404ErrorHandler_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = N404ErrorHandlerSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
