

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { N404ErrorHandlerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ErrorHandlingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when N404_ERROR_HANDLER_TEST_LIVE=TRUE.
  afterEach(liveDelay('N404_ERROR_HANDLER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = N404ErrorHandlerSDK.test()
    const ent = testsdk.ErrorHandling()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.N404_ERROR_HANDLER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'error_handling.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"causes","req":false,"short":"Potential causes for the 404 error","type":"`$ARRAY`","index$":0},{"active":true,"name":"solutions","req":false,"short":"Suggested solutions to fix the error","type":"`$ARRAY`","index$":1},{"active":true,"format":"date-time","name":"timestamp","req":false,"short":"Timestamp when the error was recorded","type":"`$STRING`","index$":2},{"active":true,"name":"url","req":false,"short":"The requested URL that returned 404","type":"`$STRING`","index$":3}],"name":"error_handling","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"referrer","orig":"referrer","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"url","orig":"url","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /404","json":"{\"operationId\":\"get404ErrorInfo\",\"parameters\":[{\"description\":\"The URL that resulted in a 404 error\",\"in\":\"query\",\"name\":\"url\",\"required\":false,\"schema\":{\"format\":\"uri\",\"type\":\"string\"}},{\"description\":\"The referring URL where the broken link was found\",\"in\":\"query\",\"name\":\"referrer\",\"required\":false,\"schema\":{\"format\":\"uri\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"causes\":[\"Page has been moved or deleted\",\"URL may contain a typo\",\"Link is outdated\"],\"solutions\":[\"Check for redirects or updated URLs\",\"Verify spelling in the URL\",\"Use site search to find the content\"],\"timestamp\":\"2024-01-15T12:00:00Z\",\"url\":\"https://example.com/missing-page\"},\"schema\":{\"properties\":{\"causes\":{\"description\":\"Potential causes for the 404 error\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"solutions\":{\"description\":\"Suggested solutions to fix the error\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"timestamp\":{\"description\":\"Timestamp when the error was recorded\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"The requested URL that returned 404\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with 404 error analysis\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/404","segments":[{"lit":"404"}],"select":{"exist":["referrer","url"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"error_handling","name__orig":"error_handling","Name":"ErrorHandling","name_":"error_handling","name-":"error-handling","NAME":"ERROR_HANDLING","index$":0}, {"active":true,"entity":"error_handling","key$":"BasicErrorHandlingFlow","kind":"basic","name":"BasicErrorHandlingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"error_handling_ref01"}}],"index$":0}]}, 'ErrorHandling')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let error_handling_ref01_data = Object.values(setup.data.existing.error_handling)[0] as any

    // LIST
    const error_handling_ref01_ent = client.ErrorHandling()
    const error_handling_ref01_match: any = {}

    const error_handling_ref01_list = (await error_handling_ref01_ent.list(error_handling_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/error_handling/ErrorHandlingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = N404ErrorHandlerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['error_handling01','error_handling02','error_handling03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'N404_ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID': idmap,
    'N404_ERROR_HANDLER_TEST_LIVE': 'FALSE',
    'N404_ERROR_HANDLER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['N404_ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID']

  const live = 'TRUE' === env.N404_ERROR_HANDLER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['N404_ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new N404ErrorHandlerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.N404_ERROR_HANDLER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
