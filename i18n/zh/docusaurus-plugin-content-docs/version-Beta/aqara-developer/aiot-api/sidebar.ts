import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-Beta/aqara-developer/aiot-api/aiot-api",
    },
    {
      type: "category",
      label: "Space",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/aiot-api/space",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/get-spaces",
          label: "查询空间列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/create-space",
          label: "创建空间",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/update-space-name",
          label: "修改空间名称",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Device",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/aiot-api/device",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/get-device-types",
          label: "查询设备类型集合",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/get-devices",
          label: "查询设备信息列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/get-device-definitions",
          label: "查询设备定义（设备详细信息）",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/get-device-definition-numeric",
          label: "查询单设备定义（数字 ID 形态）",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/execute-device-trait",
          label: "控制设备 / 设备更换房间 / 设备改名",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/execute-device-command",
          label: "设备命令执行",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/execute-device-command-await",
          label: "设备命令执行并等待响应",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/get-trait-values",
          label: "查询trait功能值",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Subscription",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/aiot-api/subscription",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/mqtt-subscribe",
          label: "获取 MQTT 连接配置",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/mqtt-unsubscribe",
          label: "使 MQTT 连接配置失效",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
