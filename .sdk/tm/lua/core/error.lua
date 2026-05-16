-- N404ErrorHandler SDK error

local N404ErrorHandlerError = {}
N404ErrorHandlerError.__index = N404ErrorHandlerError


function N404ErrorHandlerError.new(code, msg, ctx)
  local self = setmetatable({}, N404ErrorHandlerError)
  self.is_sdk_error = true
  self.sdk = "N404ErrorHandler"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function N404ErrorHandlerError:error()
  return self.msg
end


function N404ErrorHandlerError:__tostring()
  return self.msg
end


return N404ErrorHandlerError
