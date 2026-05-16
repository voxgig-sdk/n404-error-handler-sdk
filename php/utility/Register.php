<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

N404ErrorHandlerUtility::setRegistrar(function (N404ErrorHandlerUtility $u): void {
    $u->clean = [N404ErrorHandlerClean::class, 'call'];
    $u->done = [N404ErrorHandlerDone::class, 'call'];
    $u->make_error = [N404ErrorHandlerMakeError::class, 'call'];
    $u->feature_add = [N404ErrorHandlerFeatureAdd::class, 'call'];
    $u->feature_hook = [N404ErrorHandlerFeatureHook::class, 'call'];
    $u->feature_init = [N404ErrorHandlerFeatureInit::class, 'call'];
    $u->fetcher = [N404ErrorHandlerFetcher::class, 'call'];
    $u->make_fetch_def = [N404ErrorHandlerMakeFetchDef::class, 'call'];
    $u->make_context = [N404ErrorHandlerMakeContext::class, 'call'];
    $u->make_options = [N404ErrorHandlerMakeOptions::class, 'call'];
    $u->make_request = [N404ErrorHandlerMakeRequest::class, 'call'];
    $u->make_response = [N404ErrorHandlerMakeResponse::class, 'call'];
    $u->make_result = [N404ErrorHandlerMakeResult::class, 'call'];
    $u->make_point = [N404ErrorHandlerMakePoint::class, 'call'];
    $u->make_spec = [N404ErrorHandlerMakeSpec::class, 'call'];
    $u->make_url = [N404ErrorHandlerMakeUrl::class, 'call'];
    $u->param = [N404ErrorHandlerParam::class, 'call'];
    $u->prepare_auth = [N404ErrorHandlerPrepareAuth::class, 'call'];
    $u->prepare_body = [N404ErrorHandlerPrepareBody::class, 'call'];
    $u->prepare_headers = [N404ErrorHandlerPrepareHeaders::class, 'call'];
    $u->prepare_method = [N404ErrorHandlerPrepareMethod::class, 'call'];
    $u->prepare_params = [N404ErrorHandlerPrepareParams::class, 'call'];
    $u->prepare_path = [N404ErrorHandlerPreparePath::class, 'call'];
    $u->prepare_query = [N404ErrorHandlerPrepareQuery::class, 'call'];
    $u->result_basic = [N404ErrorHandlerResultBasic::class, 'call'];
    $u->result_body = [N404ErrorHandlerResultBody::class, 'call'];
    $u->result_headers = [N404ErrorHandlerResultHeaders::class, 'call'];
    $u->transform_request = [N404ErrorHandlerTransformRequest::class, 'call'];
    $u->transform_response = [N404ErrorHandlerTransformResponse::class, 'call'];
});
