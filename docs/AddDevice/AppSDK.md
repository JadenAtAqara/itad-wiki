---
sidebar_position: 3
---

# APP SDK

If needs to integrate the Aqara device into a third-party APP, the developer can choose to integrate the SDK.

There are currently two types of SDK: **SDK without UI**, all front-end pages need to be designed and developed by the developer; **SDK with UI**, provides SDK and demo with Aqara style, developers can also replace with their own brand UI interaction style.

The APP SDK is generally suitable for virtual account authorization. For the authorization process, please refer to "**Authorization management-Obtain virtual account authorization through API**" page.

## SDK without UI

The SDK is only used for add gateway device, and add the sub-device through the `write.device.openConnect` interface.

The process is as follows:
(The original text references an image/diagram named "SDK process" here, which cannot be converted to text.)

**Note:** Since IOS is mandatory for Homekit, the device with Homekit function needs to be equipped with Homekit process when adding it using IOS mobile phone.

## SDK with UI

The SDK with UI will provide a standardized UI interactive page in Aqara style. Developers can use it directly or change the interactive UI design according to their own APP style.

## SDK integration instructions

Integration process is as follows:
(The original text references an image/diagram named "UISDK API" here, which cannot be converted to text.)

Currently we haven't provided download link for this SDK. If you have any requirements, please consult Lumi Oversea Business. Thanks.

### Get UI-SDK initialization parameter interface

**Request parameters:** NA

**Request demo**

```json
{
  "intent": "config.app.init",
  "data": {}
}

