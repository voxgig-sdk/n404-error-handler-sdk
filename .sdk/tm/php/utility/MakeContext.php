<?php
declare(strict_types=1);

// N404ErrorHandler SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class N404ErrorHandlerMakeContext
{
    public static function call(array $ctxmap, ?N404ErrorHandlerContext $basectx): N404ErrorHandlerContext
    {
        return new N404ErrorHandlerContext($ctxmap, $basectx);
    }
}
