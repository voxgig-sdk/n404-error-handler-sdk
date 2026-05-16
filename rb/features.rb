# N404ErrorHandler SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module N404ErrorHandlerFeatures
  def self.make_feature(name)
    case name
    when "base"
      N404ErrorHandlerBaseFeature.new
    when "test"
      N404ErrorHandlerTestFeature.new
    else
      N404ErrorHandlerBaseFeature.new
    end
  end
end
