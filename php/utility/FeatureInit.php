<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility: feature_init

class N404ErrorHandlerFeatureInit
{
    public static function call(N404ErrorHandlerContext $ctx, mixed $f): void
    {
        $fname = $f->get_name();
        $fopts = [];
        if ($ctx->options) {
            $feature_opts = \Voxgig\Struct\Struct::getprop($ctx->options, 'feature');
            if (is_array($feature_opts)) {
                $fo = \Voxgig\Struct\Struct::getprop($feature_opts, $fname);
                if (is_array($fo)) {
                    $fopts = $fo;
                }
            }
        }
        if (($fopts['active'] ?? null) === true) {
            $f->init($ctx, $fopts);
        }
    }
}
