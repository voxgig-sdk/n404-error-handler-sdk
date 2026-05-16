<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility: feature_add

class N404ErrorHandlerFeatureAdd
{
    public static function call(N404ErrorHandlerContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
