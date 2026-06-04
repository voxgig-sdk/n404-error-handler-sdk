# N404ErrorHandler SDK

Chinese Character Web API serving Unihan data for the ~20,902 CJK Unified Ideographs (despite the misleading SDK title)

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About 404 Error Handler

Note on naming: this SDK is slugged `n404-error-handler` and titled "404 Error Handler", but the configured server `http://ccdb.hemiola.com/` is in fact the **Chinese Character Web API** (CCDB = Chinese Character Database), a small read-only REST-like service authored by the operator of [hemiola.com](http://hemiola.com/) and posted in 2011. The "404 Error Handler" / credit-card-database labels appear to be incorrect metadata on the upstream catalogue entry rather than a description of what the server actually returns.

The API exposes character information drawn from the [Unihan Database](http://www.unicode.org/charts/unihan.html), restricted to the 20,902 CJK Unified Ideographs in the `U+4E00`–`U+9FFF` block. It is JSON-only, GET-based (POST is accepted as a synonym for GET; PUT and DELETE are not), and has CORS enabled for browser use.

What you can do with the real endpoint:

- List characters by Kangxi radical, e.g. `GET /characters/radicals/{n}` (the documented example is `/characters/radicals/85`).
- Filter results by character set with a `filter` query parameter — supported names include `gb` (GB2312), `big5`, `big5a`, `big5b`, `sjis` (Shift JIS), `simplified`, and `simplifiable`, with `!` for negation.
- Choose returned fields via `fields=`, e.g. `fields=kDefinition,kMandarin` for the English gloss and Pīnyīn reading.
- Replace results with a count using the `count` parameter.

Operational notes: the service is a small personal project running on a LAMP stack; it has no published auth, rate-limit, or SLA, and at the time of writing third-party monitors report the host as down. Treat it as a curiosity / learning aid rather than a dependable backend.

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

## 30-second quickstart

### TypeScript

```ts
import { N404ErrorHandlerSDK } from 'n404-error-handler'

const client = new N404ErrorHandlerSDK({})

// List all errorhandlings
const errorhandlings = await client.ErrorHandling().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **ErrorHandling** | Listed as the sole entity grouping in this SDK, but it does not correspond to anything visible on the live `ccdb.hemiola.com` service, which exposes Chinese-character lookups (e.g. `/characters/radicals/{n}`) rather than any error-handling resource. | `/404` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from n404errorhandler_sdk import N404ErrorHandlerSDK

client = N404ErrorHandlerSDK({})

# List all errorhandlings
errorhandlings, err = client.ErrorHandling(None).list(None, None)
```

### PHP

```php
<?php
require_once 'n404errorhandler_sdk.php';

$client = new N404ErrorHandlerSDK([]);

// List all errorhandlings
[$errorhandlings, $err] = $client->ErrorHandling(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/n404-error-handler-sdk/go"

client := sdk.NewN404ErrorHandlerSDK(map[string]any{})

// List all errorhandlings
errorhandlings, err := client.ErrorHandling(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "N404ErrorHandler_sdk"

client = N404ErrorHandlerSDK.new({})

# List all errorhandlings
errorhandlings, err = client.ErrorHandling(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("n404-error-handler_sdk")

local client = sdk.new({})

-- List all errorhandlings
local errorhandlings, err = client:ErrorHandling(nil):list(nil, nil)
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
client = N404ErrorHandlerSDK.test(None, None)
result, err = client.ErrorHandling(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = N404ErrorHandlerSDK::test(null, null);
[$result, $err] = $client->ErrorHandling(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ErrorHandling(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = N404ErrorHandlerSDK.test(nil, nil)
result, err = client.ErrorHandling(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ErrorHandling(nil):load(
  { id = "test01" }, nil
)
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

## Using the 404 Error Handler

- Upstream: [http://ccdb.hemiola.com/](http://ccdb.hemiola.com/)

- The service itself (`ccdb.hemiola.com`) does not publish a licence on its landing page.
- Data is sourced from the [Unihan Database](http://www.unicode.org/charts/unihan.html) provided by [The Unicode Consortium](http://www.unicode.org/); reuse of that data is governed by the Unicode terms.
- The freepublicapis.com listing currently reports the service as unreachable (100% error rate at last check), so production use is not advisable.

---

Generated from the 404 Error Handler OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
