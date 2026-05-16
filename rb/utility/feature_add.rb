# N404ErrorHandler SDK utility: feature_add
module N404ErrorHandlerUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
