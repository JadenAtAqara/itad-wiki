import assert from 'node:assert/strict';
import {readFile, access, writeFile} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {compile} from '@mdx-js/mdx';
import {createRequire} from 'node:module';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

const require = createRequire(import.meta.url);
const {default: remarkHeadings} = require('@docusaurus/mdx-loader/lib/remark/headings/index.js');
const {escapeMarkdownHeadingIds} = require('@docusaurus/utils');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const names = [
  'unified-protocol-script', 'javascript-for-udp-tcp-integration',
  'javascript-for-http-integration', 'javascript-for-mqtt-integration',
  'ai-agent-device-onboarding', 'protocol-script-mcp-api',
];
const locales = {
  en: 'versioned_docs/version-Beta/aqara-studio',
  zh: 'i18n/zh/docusaurus-plugin-content-docs/version-Beta/aqara-studio',
};
let checks = 0;
const examples = new Map();
const documents = new Map();
const graalCases = [];
function equal(actual, expected) { assert.deepEqual(actual, expected); checks += 1; }
function ok(value, message) { assert.ok(value, message); checks += 1; }
const plain = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value,
  (_, item) => ArrayBuffer.isView(item) ? Array.from(item) : item));
const jsonBlocks = text => [...text.matchAll(/^```json[^\r\n]*\r?\n([\s\S]*?)^```\s*$/gm)]
  .map(match => JSON.parse(match[1]));

// 这里只检查文档示例，不替代 Studio 的 GraalJS 校验或实机通信。
function call(context, entry, input) {
  context.__docInput = structuredClone(input);
  let value = plain(new vm.Script(`${entry}(__docInput)`).runInContext(context, {timeout: 500}));
  if (entry === 'decode' && value.operation !== 'ignore' && !value.operation) {
    value = {...value, operation: input.operation};
  }
  return value;
}

for (const [locale, directory] of Object.entries(locales)) {
  for (const name of names) {
    const path = resolve(root, directory, `${name}.mdx`);
    const text = await readFile(path, 'utf8');
    documents.set(`${locale}/${name}`, text);
    ok(!/核对日期|必读与版本|Implementation basis|checked on \*\*\d{4}|Checked \*\*\d{4}/.test(text),
      `Internal review annotations in ${locale}/${name}`);
    await compile({value: escapeMarkdownHeadingIds(text), path}, {remarkPlugins: [
      remarkFrontmatter, [remarkHeadings, {anchorsMaintainCase: false}], remarkGfm,
    ]});
    checks += 1;
    for (const block of text.matchAll(/^```json[^\r\n]*\r?\n([\s\S]*?)^```\s*$/gm)) {
      JSON.parse(block[1]);
      checks += 1;
    }
    for (const link of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = link[1].split('#')[0];
      if (target.startsWith('.') && /\.(mdx|md)$/.test(target)) {
        await access(resolve(dirname(path), target));
        checks += 1;
      }
    }
    const scripts = [...text.matchAll(/^```javascript[^\r\n]*\r?\n([\s\S]*?)^```\s*$/gm)]
      .map(match => match[1]);
    examples.set(`${locale}/${name}`, scripts);
    for (const source of scripts) {
      const context = vm.createContext({});
      new vm.Script(source, {filename: path}).runInContext(context, {timeout: 500});
      equal(typeof context.describe, 'function');
      equal(typeof context.encode, 'function');
      equal(typeof context.decode, 'function');
      equal(plain(context.describe()).contractVersion, 1);
      const fixtures = [];
      const invoke = (entry, input) => {
        const expected = call(context, entry, input);
        fixtures.push({entry, input, expected});
        return expected;
      };
      if (name === 'unified-protocol-script') {
        equal(invoke('encode', {operation: 'read'}), null);
        equal(invoke('decode', {operation: 'discoverDevices'}), {operation: 'discoverDevices', devices: []});
      } else if (name === 'javascript-for-udp-tcp-integration') {
        equal(invoke('encode', {transport: 'tcp', operation: 'write', deviceId: 'demo-1', pointId: 'volume', value: 20}),
          {bytes: [170, 17, 1, 20, 85]});
        equal(invoke('decode', {transport: 'tcp', deviceId: 'demo-1', bytes: [170, 144, 1, 20, 85]}),
          {operation: 'read', deviceId: 'demo-1', points: [{pointId: 'volume', value: 20}]});
        equal(invoke('decode', {transport: 'udp', deviceId: 'demo-1', bytes: [170, 145, 1, 1, 85]}),
          {operation: 'write', deviceId: 'demo-1', code: 1});
        equal(invoke('decode', {transport: 'tcp', deviceId: 'demo-1', bytes: [170, 144, 2, 20, 85]}), {operation: 'ignore'});
        assert.throws(() => invoke('encode', {operation: 'write', deviceId: 'demo-1', pointId: 'volume', value: 20.5}));
        checks += 1;
      } else if (name === 'javascript-for-http-integration') {
        equal(invoke('decode', {transport: 'http', operation: 'read', deviceId: 'demo-1', pointId: 'power', body: '{"value":false}'}),
          {operation: 'read', points: [{pointId: 'power', value: false}]});
        equal(invoke('decode', {transport: 'http', operation: 'write', deviceId: 'demo-1', body: '{"ok":false}'}),
          {operation: 'write', code: 1});
        equal(invoke('decode', {transport: 'http', operation: 'read', deviceId: 'demo-1', pointId: 'power', body: '{}'}),
          {operation: 'read', code: 1, points: [], errorMsg: 'Missing power value'});
        equal(invoke('decode', {transport: 'http', operation: 'report', body: '{"deviceId":"other","value":true}'}), {operation: 'ignore'});
        const blocks = [...text.matchAll(/^```json[^\r\n]*\r?\n([\s\S]*?)^```\s*$/gm)];
        const fixtures = blocks.map(match => JSON.parse(match[1])).find(Array.isArray);
        ok(fixtures?.length === 2, 'HTTP fixtures must exist');
        for (const fixture of fixtures) equal(invoke(fixture.entry, fixture.input), fixture.expected);
      } else if (name === 'javascript-for-mqtt-integration') {
        const discovery = invoke('decode', {transport: 'mqtt', operation: 'discoverDevices'}).devices[0];
        equal(discovery.deviceId, 'demo-1');
        ok(discovery.clientId !== discovery.deviceId, 'MQTT example must distinguish connection and business identity');
        equal(invoke('encode', {transport: 'mqtt', operation: 'read', deviceId: 'demo-1', pointId: 'volume'}),
          {body: '{"get":"volume"}', topic: 'vendor/demo-1/get', retained: false});
        equal(invoke('encode', {transport: 'mqtt', operation: 'write', deviceId: 'demo-1', pointId: 'volume', value: 20}),
          {body: '{"volume":20}', qos: 1, retained: false});
        equal(invoke('decode', {transport: 'mqtt', operation: 'report', topic: 'vendor/demo-1/state', body: '{"deviceId":"demo-1","volume":20}'}),
          {operation: 'report', deviceId: 'demo-1', points: [{pointId: 'volume', value: 20}]});
        equal(invoke('decode', {transport: 'mqtt', operation: 'report', topic: 'vendor/demo-1/state', body: null}), {operation: 'ignore'});
        equal(invoke('decode', {transport: 'mqtt', operation: 'report', topic: 'vendor/demo-1/state', body: '{"deviceId":"other","volume":20}'}), {operation: 'ignore'});
      }
      if (name !== 'unified-protocol-script') {
        invoke('decode', {operation: 'discoverPoints', deviceId: 'demo-1', bytes: null, body: null});
      }
      const transports = name === 'javascript-for-udp-tcp-integration' ? ['tcp', 'udp']
        : [name === 'javascript-for-http-integration' ? 'http'
          : name === 'javascript-for-mqtt-integration' ? 'mqtt' : 'tcp'];
      for (const transport of transports) graalCases.push({name: `${locale}/${name}/${transport}`, source, transport,
        fixtures: fixtures.map(fixture => ({...fixture, input: {...fixture.input, transport}}))});
    }
  }
}
for (const name of names) equal(examples.get(`en/${name}`), examples.get(`zh/${name}`));

// 用文档自身的 MQTT 示例检查采集/重放衔接；这里只模拟已核对的输入形状，不模拟真实采集器。
for (const locale of Object.keys(locales)) {
  const reference = documents.get(`${locale}/protocol-script-mcp-api`);
  const blocks = jsonBlocks(reference);
  const capture = blocks.find(value => value.payloadMode === 'sanitized');
  const replay = blocks.find(value => value.scriptContent && value.frames);
  equal(capture.payloadPolicy.format, 'json');
  equal(capture.payloadPolicy.jsonPointers, ['/deviceId', '/volume']);
  equal(replay.context, {operation: 'report', topic: 'vendor/demo-1/state'});
  const body = {deviceId: 'demo-1', volume: 20};
  const selected = Object.fromEntries(capture.payloadPolicy.jsonPointers.map(pointer => {
    ok(/^\/[A-Za-z0-9_-]+$/.test(pointer), 'This documentation fixture selects flat vendor-body leaves');
    const key = pointer.slice(1);
    ok(Object.hasOwn(body, key), `The vendor body is missing ${key}`);
    return [key, body[key]];
  }));
  const retainedInput = {transport: 'mqtt', operation: 'report', body: JSON.stringify(selected)};
  const context = vm.createContext({});
  new vm.Script(examples.get(`${locale}/javascript-for-mqtt-integration`)[0])
    .runInContext(context, {timeout: 500});
  const invoke = input => call(context, 'decode', input);
  equal(invoke({...retainedInput, ...replay.context}), replay.frames[0].expected);
  // 修复前没有补 topic，且白名单按统一结果而非厂商正文取值；两种遗漏均使同一断言失败。
  const noTopic = invoke(retainedInput);
  equal(noTopic, {operation: 'ignore'});
  assert.throws(() => assert.deepEqual(noTopic, replay.frames[0].expected));
  checks += 1;
  const noVolume = invoke({...retainedInput, ...replay.context, body: JSON.stringify({deviceId: 'demo-1'})});
  equal(noVolume, {operation: 'ignore'});
  assert.throws(() => assert.deepEqual(noVolume, replay.frames[0].expected));
  checks += 1;

  const playbook = documents.get(`${locale}/ai-agent-device-onboarding`);
  const title = playbook.match(/^title: "([^"]+)"/m)?.[1];
  ok(title && !title.includes('AI Agent'), 'The integration guide must address both people and Agents');
  ok(playbook.split(/\r?\n/).includes(`# ${title}`), 'The page title and visible heading must match');
  equal((playbook.match(/^## /gm) || []).length, 4);
  equal((playbook.match(/^<details>$/gm) || []).length, 3);
  equal((playbook.match(/^<\/details>$/gm) || []).length, 3);
  for (const name of ['unified-protocol-script', 'protocol-script-mcp-api']) {
    ok(playbook.includes(`./${name}.mdx`), `Missing secondary reference ${name}`);
    ok(documents.get(`${locale}/${name}`).includes('displayed_sidebar: aqaraStudioSidebar'),
      'Secondary references must retain the original site navigation');
  }
  ok(playbook.includes('{#api-workflow}') && playbook.includes('{#workflow}'), 'Both integration entrances must be present');
  const read = jsonBlocks(playbook).find(value => value.command === 'readScript');
  ok(read, 'Agent playbook needs an explicit saved-source readback command');
  equal(Object.keys(read.input), ['scriptPath']);
  ok(reference.includes('Station.station.communication'), 'Script-file permission owner must be explicit');
  ok(reference.includes('captureWindow') && reference.includes('readPayloadCapture.frames[].sequence'),
    'Payload replay must distinguish its cursor from metadata capture');
  ok(documents.get(`${locale}/unified-protocol-script`).includes('encode(ack)'), 'Report ACK input must be documented');
  ok(documents.get(`${locale}/javascript-for-udp-tcp-integration`).includes('128'), 'TCP fallback chunk limit missing');
  ok(documents.get(`${locale}/javascript-for-mqtt-integration`).includes('connectionType=4'), 'X.509 mode boundary missing');
}
console.log('Replay example regression checked: missing topic or missing vendor value fails the expected output (Node VM only).');

for (const directory of Object.values(locales)) {
  for (const transport of ['tcp', 'udp', 'http', 'mqtt']) {
    const page = await readFile(resolve(root, directory, 'device-integration', `${transport}.mdx`), 'utf8');
    ok(!/(buildDiscoveryRequest|parseDiscoveryResponse|buildDiscoverPointsRequest|parseDiscoverPointsResponse)/.test(page),
      `Legacy discovery instructions in ${directory}/${transport}`);
    ok(page.includes('ai-agent-device-onboarding.mdx'), 'Protocol tutorial must link to the shared integration guide');
    ok(!/AI Agent|MCP\/API/.test(page), 'Keep detailed programmatic integration in the shared guide');
  }
  const developer = await readFile(resolve(root, directory, 'developer-guide.mdx'), 'utf8');
  ok(!/ai-agent-device-onboarding|unified-protocol-script|protocol-script-mcp-api/.test(developer),
    'Developer Guide must retain its original API scope');
  const mcp = await readFile(resolve(root, directory, 'set-up-mcp-server.mdx'), 'utf8');
  equal((mcp.match(/ai-agent-device-onboarding\.mdx/g) || []).length, 1);
  ok(!/protocol-script-mcp-api|unified-protocol-script|validateScript|uploadScript/.test(mcp),
    'MCP setup should link to, not duplicate, the script workflow');
}

const sidebars = JSON.parse(await readFile(resolve(root, 'versioned_sidebars/version-Beta-sidebars.json'), 'utf8'));
const categories = items => items.flatMap(item => typeof item === 'object' && item.type === 'category'
  ? [item, ...categories(item.items || [])] : []);
const studioCategories = categories(sidebars.aqaraStudioSidebar);
const developerCategory = studioCategories.find(item => item.label === 'Developer');
const scriptCategory = studioCategories.find(item => item.label === 'JavaScript for Integration');
ok(developerCategory && scriptCategory, 'Original navigation categories must remain');
ok(!JSON.stringify(developerCategory).includes('ai-agent-device-onboarding'), 'Keep the script guide out of Developer navigation');
equal(scriptCategory.items.filter(item => item === 'aqara-studio/ai-agent-device-onboarding').length, 1);
for (const name of ['unified-protocol-script', 'protocol-script-mcp-api']) {
  ok(!JSON.stringify(sidebars).includes(`aqara-studio/${name}`), 'Technical references should not add primary navigation entries');
}

// 从实际源码核对公开命令及 REST 路由，避免文档凭方案名称编造接口。
if (process.env.STUDIO_SOURCE_ROOT) {
  const source = (module, path) => readFile(resolve(process.env.STUDIO_SOURCE_ROOT, module, path), 'utf8');
  const open = 'AIOT_studio_open';
  const base = 'src/main/kotlin/com/lumi/framework/open/';
  const schema = await source(open, `${base}server/service/ProtocolDebugSchema.kt`);
  const registry = await source(open, `${base}server/service/OpenResourceProviderRegistry.kt`);
  const routes = await source(open, `${base}server/routing/OpenApiResourceRoutes.kt`);
  const points = await source(open, `${base}mcp/point/PointMappingSchemas.kt`);
  const scripts = await source(open, 'src/main/kotlin/com/lumi/framework/agent/skill/builtin/ProtocolScriptSupport.kt');
  const namesFromSource = [
    ...[...schema.matchAll(/^\s*"(\w+)" to command\(/gm)].map(match => match[1]),
    'connectionSnapshot', 'startDebugSession', 'validateScript', 'listScripts', 'readScript', 'uploadScript',
  ];
  const pointOperations = points.match(/val operations = listOf\(([^)]+)\)/)?.[1];
  ok(pointOperations, 'Point operation declaration missing');
  const tools = [...pointOperations.matchAll(/"(\w+)"/g)].map(match => `protocol_point_${match[1]}`);
  for (const locale of Object.keys(locales)) {
    const reference = documents.get(`${locale}/protocol-script-mcp-api`);
    for (const command of [...namesFromSource, ...tools]) ok(reference.includes(command), `Missing ${command} in ${locale}`);
    for (const match of routes.matchAll(/OpenApiRouteDef\(HttpMethod\.\w+, "([^"]+)"/g)) {
      ok(reference.includes(match[1]), `Undocumented route ${match[1]}`);
    }
    for (const uri of ['protocol-script', 'protocol-debug', 'protocol-point', 'resource-api', 'mcp']) {
      ok(reference.includes(`agent://contracts/${uri}/guide`), `Missing runtime guide ${uri}`);
    }
    ok(reference.includes('1,048,576'), 'Script and fixture size budget missing');
  }
  for (const command of ['startDebugSession', 'connectionSnapshot']) ok(registry.includes(`"${command}"`), command);
  for (const command of ['validationSchema', 'uploadSchema', 'readSchema', 'listSchema']) ok(scripts.includes(command), command);
  const numeric = await source('AIOT_studio_script', 'src/main/kotlin/com/lumi/framework/script/ScriptPointSupport.kt');
  ok(!/readOptional(?:Int|Double)Member\(pointObject,\s*FIELD_PRECISION/.test(numeric), 'precision behavior changed; recheck docs');

  const permission = await source(open, `${base}server/service/ProtocolScriptValidationResource.kt`);
  equal((permission.match(/canManage\(Station\.station\.communication,/g) || []).length, 2);
  const readResult = scripts.slice(scripts.indexOf('fun readScript('), scripts.indexOf('fun uploadScript('));
  const readKeys = [...readResult.matchAll(/put\("(\w+)"/g)].map(match => match[1]);
  for (const key of ['scriptPath', 'referenceCount']) ok(readKeys.includes(key), `readScript result changed: ${key}`);
  for (const key of ['extensionScriptPath', 'replaced', 'reloadFailedCount']) {
    ok(!readKeys.includes(key), `readScript now returns ${key}; recheck docs`);
  }
  const debug = await source(open, `${base}server/service/ProtocolDebugService.kt`);
  ok(debug.includes('operation != "probe" && point == null'), 'Debug report/read target contract changed');
  ok(debug.includes('value.toString().toByteArray(Charsets.UTF_8).size <= 512'), 'Expected-value budget changed');
  const payload = await source('AIOT_studio_script', 'src/main/kotlin/com/lumi/framework/script/debug/DebugPayloadCapture.kt');
  const retained = payload.slice(payload.indexOf('val message = buildJsonObject'), payload.indexOf('val hex ='));
  for (const key of ['transport', 'operation', 'deviceId', 'pointId', 'body', 'bytes']) {
    ok(retained.includes(`"${key}"`), `Retained payload input changed: ${key}`);
  }
  for (const key of ['topic', 'path', 'requestId', 'config', 'statusCode', 'headers']) {
    ok(!retained.includes(`"${key}"`), `Capture now retains ${key}; recheck docs`);
  }
  const captureInput = await source('AIOT_studio_script', 'src/main/kotlin/com/lumi/framework/script/debug/ScriptPayloadCapture.kt');
  ok(captureInput.includes('policy.format == "bytes" || body == null'), 'Payload body/bytes selection changed');
  const payloadService = await source(open, `${base}server/service/ProtocolPayloadDebugSupport.kt`);
  ok(payloadService.includes('setOf("operation", "deviceId", "pointId", "requestId", "topic", "path", "config")'),
    'Replay context allowlist changed');
  const tcp = await source('AIOT_studio_tcp', 'src/main/kotlin/com/lumi/framework/tcp/comm/TcpRxConn.kt');
  ok(tcp.includes('PARSE_RECEIVED_READ_SIZE = 128') && tcp.includes('channel.readAvailable(data, 0, data.size)'),
    'TCP fallback no longer matches the documented chunk behavior');
  const udp = await source('AIOT_studio_udp', 'src/main/kotlin/com/lumi/framework/udp/UdpMessageParser.kt');
  ok(udp.includes('val socket = DatagramSocket()'), 'UDP discovery bind behavior changed');
  ok(!udp.includes('getMember("responsePort")') && !udp.includes('getMember("responseIp")'),
    'UDP plugin added reply-listener overrides; recheck docs');
  const udpFrames = await source('AIOT_studio_udp', 'src/main/kotlin/com/lumi/framework/udp/comm/UdpRxConn.kt');
  ok(udpFrames.includes('return data.copyOfRange(start, start + totalLength)'), 'UDP frame extraction changed');
  const mqttAuth = await source('AIOT_studio_mqtt', 'src/main/kotlin/com/lumi/framework/mqtt/util/AMqttConnectionType.kt');
  ok(mqttAuth.includes('X509_OVER_SSL = 4'), 'MQTT X.509 mode changed');
  const mqttProxy = await source('AIOT_studio_mqtt', 'src/main/kotlin/com/lumi/framework/mqtt/proxyExt/subAndPub/MqttSubAndPubExt.kt');
  ok(mqttProxy.includes('getScriptDevice()?.deviceId ?: getDevice().getDeviceUuid()'), 'MQTT business-ID resolver missing');
  ok(mqttProxy.includes('parser.buildReadRequest(getScriptDeviceId(), pointUuid)'), 'MQTT ordinary read identity differs from docs');
  ok(mqttProxy.includes('parser.buildWriteRequest(getScriptDeviceId(), pointUuid, rValue)'), 'MQTT ordinary write identity differs from docs');
  ok(mqttProxy.includes('getRefreshFrequency(): ARefreshFrequency = ARefreshFrequency.normal'), 'MQTT refresh tier changed');
  const mqttRoute = await source('AIOT_studio_mqtt', 'src/main/kotlin/com/lumi/framework/mqtt/handler/MqttPointMessageDispatcher.kt');
  equal((mqttRoute.match(/getScriptDeviceId\(\)/g) || []).length, 2);
  ok(!mqttRoute.includes('getDeviceUuid()'), 'MQTT report ownership still uses a connection ID');
  ok(mqttRoute.includes('targetPoints.any { it.getDevice() !== targetDevice }'), 'MQTT ambiguous-device report guard missing');
  const mqttDebug = await source('AIOT_studio_mqtt', 'src/main/kotlin/com/lumi/framework/mqtt/MqttProtocolDebugAdapter.kt');
  ok(mqttDebug.includes('parser.buildReadRequest(request.device.deviceId,'), 'MQTT debug identity changed');
  const httpDevice = await source('AIOT_studio_http', 'src/main/kotlin/com/lumi/framework/http/HttpDevice.kt');
  ok(httpDevice.includes('override fun doProbe()') && httpDevice.includes('probeOk()') && !httpDevice.includes('buildDebugProbeRequest'),
    'HTTP ordinary probing changed; recheck docs');
  const resource = await source(open, `${base}server/service/OpenResourceService.kt`);
  ok(resource.includes('put("schema", it.withResourceNameSchema())'), 'Protocol instance schema wrapper changed');
  ok(resource.includes('put(protocolId, it.withResourceNameSchema())'), 'Protocol type schema wrapper changed');
  ok(resource.includes('put("hasMore", hasMore)'), 'Resource pagination changed');
  const paging = await source(open, `${base}server/service/OpenResourceDefinitionRegistry.kt`);
  ok(paging.includes('OPEN_RESOURCE_DEFAULT_PAGE_SIZE = 20') && paging.includes('OPEN_RESOURCE_MAX_PAGE_SIZE = 100'),
    'Resource page limits changed');
  for (const locale of Object.keys(locales)) {
    const reference = documents.get(`${locale}/protocol-script-mcp-api`);
    for (const key of ['data.schema', 'data.protocols.<protocolId>', 'data.hasMore']) {
      ok(reference.includes(key), `Missing actual Resource response path ${key}`);
    }
    ok(documents.get(`${locale}/ai-agent-device-onboarding`).includes('transport-readiness'), 'Transport assessment missing');
  }
  const generationGuide = await source(open, 'src/main/resources/protocol-script-generation-guide.md');
  const debugGuide = await source(open, 'src/main/resources/protocol-debug-guide.md');
  for (const guide of [generationGuide, debugGuide]) {
    ok(guide.includes('data.schema') && guide.includes('hasMore'), 'Bundled guide uses stale Resource paths');
    ok(guide.includes('Station.station.communication'), 'Bundled guide omits permission owner');
  }
  const captureExample = jsonBlocks(debugGuide).find(value => value.payloadMode === 'sanitized');
  equal(captureExample.payloadPolicy.jsonPointers, ['/deviceId', '/volume']);
  const replayExample = jsonBlocks(debugGuide).find(value => value.scriptContent && value.frames);
  equal(replayExample.context, {operation: 'report', topic: 'vendor/example/state'});
  ok(debugGuide.includes('readPayloadCapture.frames[].sequence'), 'Bundled guide conflates capture cursors');
  const httpTemplate = JSON.parse(await source('AIOT_studio_http', 'src/main/resources/protocolConfig/http.json'));
  const mqttTemplate = JSON.parse(await source('AIOT_studio_mqtt', 'src/main/resources/protocolConfig/mqtt.json'));
  const templateFields = template => template.configs.flatMap(config => config.groups.flatMap(group => group.properties));
  ok(!templateFields(httpTemplate).some(field => /httpServlet|WebService/.test(field)), 'HTTP callback configuration added; reassess gap');
  ok(!templateFields(mqttTemplate).some(field => /certificate|privateKey|rootCa/i.test(field)), 'MQTT certificate configuration added; reassess gap');
  console.log(`Source conformance checked against ${resolve(process.env.STUDIO_SOURCE_ROOT)}`);
} else {
  console.log('Source conformance skipped: set STUDIO_SOURCE_ROOT to the reviewed Studio checkout root.');
}
console.log(`Protocol documentation checks passed: ${checks}; no device I/O or GraalJS execution performed.`);
if (process.env.PROTOCOL_DOC_FIXTURES_OUT) {
  // 导出已校验的文档正文及完整断言，供独立 Studio/GraalJS 校验器消费；不发送设备报文。
  await writeFile(resolve(process.env.PROTOCOL_DOC_FIXTURES_OUT), JSON.stringify(graalCases, null, 2), 'utf8');
  console.log(`Exported ${graalCases.length} candidate/transport groups for separate GraalJS validation.`);
}
