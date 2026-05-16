<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility: result_headers

class N404ErrorHandlerResultHeaders
{
    public static function call(N404ErrorHandlerContext $ctx): ?N404ErrorHandlerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
