<?php
declare(strict_types=1);

// Typed models for the N404ErrorHandler SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ErrorHandling entity data model. */
class ErrorHandling
{
    public ?array $caus = null;
    public ?array $solution = null;
    public ?string $timestamp = null;
    public ?string $url = null;
}

/** Match filter for ErrorHandling#list (any subset of ErrorHandling fields). */
class ErrorHandlingListMatch
{
    public ?array $caus = null;
    public ?array $solution = null;
    public ?string $timestamp = null;
    public ?string $url = null;
}

