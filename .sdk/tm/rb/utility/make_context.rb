# N404ErrorHandler SDK utility: make_context
require_relative '../core/context'
module N404ErrorHandlerUtilities
  MakeContext = ->(ctxmap, basectx) {
    N404ErrorHandlerContext.new(ctxmap, basectx)
  }
end
