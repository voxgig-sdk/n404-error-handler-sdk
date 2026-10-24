# N404ErrorHandler SDK utility: prepare_body
require_relative 'media'
module N404ErrorHandlerUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return N404ErrorHandlerUtilities.raw_body(ctx.reqdata) if N404ErrorHandlerUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
