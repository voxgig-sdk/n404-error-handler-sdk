<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility: prepare_headers

class N404ErrorHandlerPrepareHeaders
{
    public static function call(N404ErrorHandlerContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
