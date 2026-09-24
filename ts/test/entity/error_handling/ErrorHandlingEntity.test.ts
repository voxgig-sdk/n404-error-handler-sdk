

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"causes":{"a":true,"h":"Causes","n":"causes","r":false,"sh":"Potential causes for the 404 error","t":"`$ARRAY`","key$":"causes","index$":0},"solutions":{"a":true,"h":"Solutions","n":"solutions","r":false,"sh":"Suggested solutions to fix the error","t":"`$ARRAY`","key$":"solutions","index$":1},"timestamp":{"a":true,"fo":"date-time","h":"Timestamp","n":"timestamp","r":false,"sh":"Timestamp when the error was recorded","t":"`$STRING`","key$":"timestamp","index$":2},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"The requested URL that returned 404","t":"`$STRING`","key$":"url","index$":3}},"name":"error_handling","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /404","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"referrer","or":"referrer","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"url","or":"url","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/404","q":{"exist":["referrer","url"]},"r":{},"s":[{"lit":"404"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"error_handling","name__orig":"error_handling","Name":"ErrorHandling","name_":"error_handling","name-":"error-handling","NAME":"ERROR_HANDLING","index$":0}, {"active":true,"entity":"error_handling","key$":"BasicErrorHandlingFlow","kind":"basic","name":"BasicErrorHandlingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"error_handling_ref01"}}],"index$":0}]}, 'ErrorHandling', {"GET /404":{"protocol":"http","operationId":"get404ErrorInfo","responses":{"200":{"description":"Successful response with 404 error analysis","content":{"application/json":{"schema":{"type":"object","properties":{"url":{"description":"The requested URL that returned 404","key$":"url","type":"string"},"causes":{"description":"Potential causes for the 404 error","items":{"type":"string"},"key$":"causes","type":"array"},"solutions":{"description":"Suggested solutions to fix the error","items":{"type":"string"},"key$":"solutions","type":"array"},"timestamp":{"description":"Timestamp when the error was recorded","format":"date-time","key$":"timestamp","type":"string"}},"index$":0},"example":{"url":"https://example.com/missing-page","causes":["Page has been moved or deleted","URL may contain a typo","Link is outdated"],"solutions":["Check for redirects or updated URLs","Verify spelling in the URL","Use site search to find the content"],"timestamp":"2024-01-15T12:00:00Z"}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}}},"parameters":[{"name":"url","in":"query","description":"The URL that resulted in a 404 error","required":false,"schema":{"type":"string","format":"uri"},"index$":0},{"name":"referrer","in":"query","description":"The referring URL where the broken link was found","required":false,"schema":{"type":"string","format":"uri"},"index$":1}],"securitySource":"unspecified"}})
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
  
