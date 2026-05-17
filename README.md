# N404ErrorHandler SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **ErrorHandling** |  | `/404` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/n404-error-handler-sdk/go"

client := sdk.NewN404ErrorHandlerSDK(map[string]any{
    "apikey": os.Getenv("N404-ERROR-HANDLER_APIKEY"),
})

// List all errorhandlings
errorhandlings, err := client.ErrorHandling(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("n404-error-handler_sdk")

local client = sdk.new({
  apikey = os.getenv("N404-ERROR-HANDLER_APIKEY"),
})

-- List all errorhandlings
local errorhandlings, err = client:ErrorHandling(nil):list(nil, nil)
```

### PHP

```php
<?php
require_once 'n404errorhandler_sdk.php';

$client = new N404ErrorHandlerSDK([
    "apikey" => getenv("N404-ERROR-HANDLER_APIKEY"),
]);

// List all errorhandlings
[$errorhandlings, $err] = $client->ErrorHandling(null)->list(null, null);
```

### Python

```python
import os
from n404errorhandler_sdk import N404ErrorHandlerSDK

client = N404ErrorHandlerSDK({
    "apikey": os.environ.get("N404-ERROR-HANDLER_APIKEY"),
})

# List all errorhandlings
errorhandlings, err = client.ErrorHandling(None).list(None, None)
```

### Ruby

```ruby
require_relative "N404ErrorHandler_sdk"

client = N404ErrorHandlerSDK.new({
  "apikey" => ENV["N404-ERROR-HANDLER_APIKEY"],
})

# List all errorhandlings
errorhandlings, err = client.ErrorHandling(nil).list(nil, nil)
```

### TypeScript

```ts
import { N404ErrorHandlerSDK } from 'n404-error-handler'

const client = new N404ErrorHandlerSDK({
  apikey: process.env.N404-ERROR-HANDLER_APIKEY,
})

// List all errorhandlings
const errorhandlings = await client.ErrorHandling().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ErrorHandling(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ErrorHandling(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = N404ErrorHandlerSDK::test(null, null);
[$result, $err] = $client->ErrorHandling(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = N404ErrorHandlerSDK.test(None, None)
result, err = client.ErrorHandling(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = N404ErrorHandlerSDK.test(nil, nil)
result, err = client.ErrorHandling(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = N404ErrorHandlerSDK.test()
const result = await client.ErrorHandling().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

