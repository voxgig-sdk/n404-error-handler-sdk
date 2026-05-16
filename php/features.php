<?php
declare(strict_types=1);

// N404ErrorHandler SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class N404ErrorHandlerFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new N404ErrorHandlerBaseFeature();
            case "test":
                return new N404ErrorHandlerTestFeature();
            default:
                return new N404ErrorHandlerBaseFeature();
        }
    }
}
