-- N404ErrorHandler SDK error

local json = require("dkjson")

local N404ErrorHandlerError = {}
N404ErrorHandlerError.__index = N404ErrorHandlerError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function N404ErrorHandlerError.new(code, msg, ctx)
  local self = setmetatable({}, N404ErrorHandlerError)
  self.is_sdk_error = true
  self.sdk = "N404ErrorHandler"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function N404ErrorHandlerError:context()
  return CONTEXT[self]
end


function N404ErrorHandlerError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function N404ErrorHandlerError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function N404ErrorHandlerError:to_json()
  return json.encode(self:to_table())
end


function N404ErrorHandlerError:__tostring()
  return self.msg
end


function N404ErrorHandlerError.__tojson(self)
  return self:to_json()
end


return N404ErrorHandlerError
