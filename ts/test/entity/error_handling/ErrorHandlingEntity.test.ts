
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { N404ErrorHandlerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ErrorHandlingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when N404ERRORHANDLER_TEST_LIVE=TRUE.
  afterEach(liveDelay('N404ERRORHANDLER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = N404ErrorHandlerSDK.test()
    const ent = testsdk.ErrorHandling()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.N____ERROR_HANDLER_TEST_LIVE
    for (const op of ['list']) {
      if (maybeSkipControl(t, 'entityOp', 'error_handling.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set N____ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let error_handling_ref01_data = Object.values(setup.data.existing.error_handling)[0] as any

    // LIST
    const error_handling_ref01_ent = client.ErrorHandling()
    const error_handling_ref01_match: any = {}

    const error_handling_ref01_list = await error_handling_ref01_ent.list(error_handling_ref01_match)


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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['N____ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'N____ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID': idmap,
    'N____ERROR_HANDLER_TEST_LIVE': 'FALSE',
    'N____ERROR_HANDLER_TEST_EXPLAIN': 'FALSE',
    'N____ERROR_HANDLER_APIKEY': 'NONE',
  })

  idmap = env['N____ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID']

  const live = 'TRUE' === env.N____ERROR_HANDLER_TEST_LIVE

  if (live) {
    client = new N404ErrorHandlerSDK(merge([
      {
        apikey: env.N____ERROR_HANDLER_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.N____ERROR_HANDLER_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
