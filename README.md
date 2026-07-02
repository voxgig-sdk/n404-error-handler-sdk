# N404ErrorHandler SDK

404 Error Handler client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install n404-error-handler
```

**Python**
```bash
pip install n404-error-handler-sdk
```

**PHP**
```bash
composer require voxgig/n404-error-handler-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/n404-error-handler-sdk/go
```

**Ruby**
```bash
gem install n404-error-handler-sdk
```

**Lua**
```bash
luarocks install n404-error-handler-sdk
```

## Quickstart

### TypeScript

```ts
import { N404ErrorHandlerSDK } from 'n404-error-handler'

const client = new N404ErrorHandlerSDK({
  apikey: process.env.N404-ERROR-HANDLER_APIKEY,
})

// List all errorhandlings
const errorhandlings = await client.ErrorHandling().list()
console.log(errorhandlings.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o n404-error-handler-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "n404-error-handler": {
      "command": "/abs/path/to/n404-error-handler-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **ErrorHandling** |  | `/404` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from n404errorhandler_sdk import N404ErrorHandlerSDK

client = N404ErrorHandlerSDK({
    "apikey": os.environ.get("N404-ERROR-HANDLER_APIKEY"),
})

# List all errorhandlings
errorhandlings, err = client.ErrorHandling().list()
print(errorhandlings)
```

### PHP

```php
<?php
require_once 'n404errorhandler_sdk.php';

$client = new N404ErrorHandlerSDK([
    "apikey" => getenv("N404-ERROR-HANDLER_APIKEY"),
]);

// List all errorhandlings
[$errorhandlings, $err] = $client->ErrorHandling()->list();
print_r($errorhandlings);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/n404-error-handler-sdk/go"

client := sdk.NewN404ErrorHandlerSDK(map[string]any{
    "apikey": os.Getenv("N404-ERROR-HANDLER_APIKEY"),
})

// List all errorhandlings
errorhandlings, err := client.ErrorHandling(nil).List(nil, nil)
fmt.Println(errorhandlings)
```

### Ruby

```ruby
require_relative "N404ErrorHandler_sdk"

client = N404ErrorHandlerSDK.new({
  "apikey" => ENV["N404-ERROR-HANDLER_APIKEY"],
})

# List all errorhandlings
errorhandlings, err = client.ErrorHandling().list
puts errorhandlings
```

### Lua

```lua
local sdk = require("n404-error-handler_sdk")

local client = sdk.new({
  apikey = os.getenv("N404-ERROR-HANDLER_APIKEY"),
})

-- List all errorhandlings
local errorhandlings, err = client:ErrorHandling():list()
print(errorhandlings)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = N404ErrorHandlerSDK.test()
const result = await client.ErrorHandling().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = N404ErrorHandlerSDK.test()
result, err = client.ErrorHandling().load({"id": "test01"})
```

### PHP

```php
$client = N404ErrorHandlerSDK::test();
[$result, $err] = $client->ErrorHandling()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.ErrorHandling(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = N404ErrorHandlerSDK.test
result, err = client.ErrorHandling().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:ErrorHandling():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the 404 Error Handler OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
