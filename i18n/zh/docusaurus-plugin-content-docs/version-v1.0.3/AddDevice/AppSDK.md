---
sidebar_position: 3
---

# APP SDK

若开发者需要集成 Aqara 设备到第三方 APP 上实现设备配网等功能，可选择集成 SDK。

目前 SDK 分两种：**不带 UI 的 SDK**，所有前端页面需开发者自行设计开发；**带 UI 的 SDK**，提供带有 Aqara 风格的 SDK 和 demo，开发者也可替换为自有品牌的 UI 交互风格。详细 SDK 对接请参考 SDK 对接开发手册。

APP SDK 一般适用于虚拟账号授权的方式，授权流程可参见 **授权管理-通过 API 获取虚拟账号授权流程** 页面。

## 不带 UI 的 SDK

SDK 仅用于网关设备配网，子设备配网通过 `write.device.openConnect` 接口实现。

具体配网流程如下：
（此处原文引用了名为 “SDK process” 的图表，无法转换为文本。）

此 SDK 暂没有开放下载链接，如有需求，请咨询绿米商务，谢谢。

**注意：** 由于 IOS 对 Homekit 有强制性，即带有 Homekit 功能的设备使用 IOS 手机添加时需要以 Homekit 的流程进行配网。

## 带 UI 的 SDK

带 UI 的 SDK 会提供 Aqara 风格标准化的 UI 交互页面，开发者可直接使用，也可根据自身 APP 风格更改交互 UI 设计。

## SDK 集成说明

集成流程如下:
（此处原文引用了名为 “UISDK API” 的图表，无法转换为文本。）

此 SDK 暂没有开放下载链接，如有需求，请咨询绿米商务，谢谢。

### 获取 UI-SDK 初始化参数接口

**请求参数：** 无

**请求示例：**

```json
{
  "intent": "config.app.init",
  "data": {}
}
