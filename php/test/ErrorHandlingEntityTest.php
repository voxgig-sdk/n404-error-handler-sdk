<?php
declare(strict_types=1);

// ErrorHandling entity test

require_once __DIR__ . '/../n404errorhandler_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ErrorHandlingEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = N404ErrorHandlerSDK::test(null, null);
        $ent = $testsdk->ErrorHandling(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = error_handling_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "error_handling." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set N___ERRORHANDLER_TEST_ERROR_HANDLING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $error_handling_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.error_handling")));
        $error_handling_ref01_data = null;
        if (count($error_handling_ref01_data_raw) > 0) {
            $error_handling_ref01_data = Helpers::to_map($error_handling_ref01_data_raw[0][1]);
        }

        // LIST
        $error_handling_ref01_ent = $client->ErrorHandling(null);
        $error_handling_ref01_match = [];

        $error_handling_ref01_list_result = $error_handling_ref01_ent->list($error_handling_ref01_match, null);
        $this->assertIsArray($error_handling_ref01_list_result);

    }
}

function error_handling_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/error_handling/ErrorHandlingTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = N404ErrorHandlerSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["error_handling01", "error_handling02", "error_handling03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("N___ERRORHANDLER_TEST_ERROR_HANDLING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "N___ERRORHANDLER_TEST_ERROR_HANDLING_ENTID" => $idmap,
        "N___ERRORHANDLER_TEST_LIVE" => "FALSE",
        "N___ERRORHANDLER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["N___ERRORHANDLER_TEST_ERROR_HANDLING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["N___ERRORHANDLER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new N404ErrorHandlerSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["N___ERRORHANDLER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["N___ERRORHANDLER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
