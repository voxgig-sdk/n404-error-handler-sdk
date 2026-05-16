# N404ErrorHandler SDK utility: prepare_body
module N404ErrorHandlerUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
