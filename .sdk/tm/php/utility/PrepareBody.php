<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility: prepare_body

class N404ErrorHandlerPrepareBody
{
    public static function call(N404ErrorHandlerContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
