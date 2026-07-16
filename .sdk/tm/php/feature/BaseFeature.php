<?php
declare(strict_types=1);

// N404ErrorHandler SDK base feature

class N404ErrorHandlerBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(N404ErrorHandlerContext $ctx, array $options): void {}
    public function PostConstruct(N404ErrorHandlerContext $ctx): void {}
    public function PostConstructEntity(N404ErrorHandlerContext $ctx): void {}
    public function SetData(N404ErrorHandlerContext $ctx): void {}
    public function GetData(N404ErrorHandlerContext $ctx): void {}
    public function GetMatch(N404ErrorHandlerContext $ctx): void {}
    public function SetMatch(N404ErrorHandlerContext $ctx): void {}
    public function PrePoint(N404ErrorHandlerContext $ctx): void {}
    public function PreSpec(N404ErrorHandlerContext $ctx): void {}
    public function PreRequest(N404ErrorHandlerContext $ctx): void {}
    public function PreResponse(N404ErrorHandlerContext $ctx): void {}
    public function PreResult(N404ErrorHandlerContext $ctx): void {}
    public function PreDone(N404ErrorHandlerContext $ctx): void {}
    public function PreUnexpected(N404ErrorHandlerContext $ctx): void {}
}
