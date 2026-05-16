<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility: result_body

class N404ErrorHandlerResultBody
{
    public static function call(N404ErrorHandlerContext $ctx): ?N404ErrorHandlerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
