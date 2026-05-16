<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility: feature_hook

class N404ErrorHandlerFeatureHook
{
    public static function call(N404ErrorHandlerContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
