-- N404ErrorHandler SDK exists test

local sdk = require("n404-error-handler_sdk")

describe("N404ErrorHandlerSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
