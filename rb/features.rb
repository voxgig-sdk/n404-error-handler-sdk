# N404ErrorHandler SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module N404ErrorHandlerFeatures
  def self.make_feature(name)
    case name
    when "base"
      N404ErrorHandlerBaseFeature.new
    when "ratelimit"
      N404ErrorHandlerRatelimitFeature.new
    when "retry"
      N404ErrorHandlerRetryFeature.new
    when "test"
      N404ErrorHandlerTestFeature.new
    when "timeout"
      N404ErrorHandlerTimeoutFeature.new
    else
      N404ErrorHandlerBaseFeature.new
    end
  end
end
