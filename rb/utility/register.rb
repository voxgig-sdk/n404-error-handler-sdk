# N404ErrorHandler SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

N404ErrorHandlerUtility.registrar = ->(u) {
  u.clean = N404ErrorHandlerUtilities::Clean
  u.done = N404ErrorHandlerUtilities::Done
  u.make_error = N404ErrorHandlerUtilities::MakeError
  u.feature_add = N404ErrorHandlerUtilities::FeatureAdd
  u.feature_hook = N404ErrorHandlerUtilities::FeatureHook
  u.feature_init = N404ErrorHandlerUtilities::FeatureInit
  u.fetcher = N404ErrorHandlerUtilities::Fetcher
  u.make_fetch_def = N404ErrorHandlerUtilities::MakeFetchDef
  u.make_context = N404ErrorHandlerUtilities::MakeContext
  u.make_options = N404ErrorHandlerUtilities::MakeOptions
  u.make_request = N404ErrorHandlerUtilities::MakeRequest
  u.make_response = N404ErrorHandlerUtilities::MakeResponse
  u.make_result = N404ErrorHandlerUtilities::MakeResult
  u.make_point = N404ErrorHandlerUtilities::MakePoint
  u.make_spec = N404ErrorHandlerUtilities::MakeSpec
  u.make_url = N404ErrorHandlerUtilities::MakeUrl
  u.param = N404ErrorHandlerUtilities::Param
  u.prepare_auth = N404ErrorHandlerUtilities::PrepareAuth
  u.prepare_body = N404ErrorHandlerUtilities::PrepareBody
  u.prepare_headers = N404ErrorHandlerUtilities::PrepareHeaders
  u.prepare_method = N404ErrorHandlerUtilities::PrepareMethod
  u.prepare_params = N404ErrorHandlerUtilities::PrepareParams
  u.prepare_path = N404ErrorHandlerUtilities::PreparePath
  u.prepare_query = N404ErrorHandlerUtilities::PrepareQuery
  u.result_basic = N404ErrorHandlerUtilities::ResultBasic
  u.result_body = N404ErrorHandlerUtilities::ResultBody
  u.result_headers = N404ErrorHandlerUtilities::ResultHeaders
  u.transform_request = N404ErrorHandlerUtilities::TransformRequest
  u.transform_response = N404ErrorHandlerUtilities::TransformResponse
}
