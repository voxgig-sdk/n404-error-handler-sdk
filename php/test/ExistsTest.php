<?php
declare(strict_types=1);

// N404ErrorHandler SDK exists test

require_once __DIR__ . '/../n404errorhandler_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = N404ErrorHandlerSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
