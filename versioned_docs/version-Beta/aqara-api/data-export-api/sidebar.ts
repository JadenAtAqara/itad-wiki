import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-Beta/aqara-api/data-export-api/data-export-api",
    },
    {
      type: "category",
      label: "Auth",
      link: {
        type: "doc",
        id: "version-Beta/aqara-api/data-export-api/auth",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-public-key",
          label: "获取临时 RSA 公钥",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/login",
          label: "登录",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/refresh-token",
          label: "刷新 Token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/logout",
          label: "登出",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Space",
      link: {
        type: "doc",
        id: "version-Beta/aqara-api/data-export-api/space",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-spaces",
          label: "查询空间列表",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Device",
      link: {
        type: "doc",
        id: "version-Beta/aqara-api/data-export-api/device",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-device-types",
          label: "查询 DeviceType 集合",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-devices",
          label: "查设备信息列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-device-definitions",
          label: "查询设备定义（设备详细信息）",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/execute-device-trait",
          label: "控制设备 / 设备更换房间 / 设备改名",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-trait-values",
          label: "查询trait功能值",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/execute-device-command",
          label: "设备命令执行",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/unbind-device",
          label: "设备解绑",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Gateway",
      link: {
        type: "doc",
        id: "version-Beta/aqara-api/data-export-api/gateway",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-gateways",
          label: "查询网关列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-gateway-connect-address",
          label: "查询网关入网服务地址",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/connect-gateways",
          label: "网关入网",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/join-subdevice",
          label: "子设备入网",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/stop-subdevice-join",
          label: "子设备停止入网",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-gateway-connect-result",
          label: "查询网关入网结果",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-device-bind-result",
          label: "查询子设备入网结果",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Automation",
      link: {
        type: "doc",
        id: "version-Beta/aqara-api/data-export-api/automation",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-automation-capabilities",
          label: "查询自动化能力",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/create-automation",
          label: "创建自动化",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/query-automation-list",
          label: "查询自动化列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/query-automation-details",
          label: "查询自动化详情",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/update-automation",
          label: "编辑自动化",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/update-automation-status",
          label: "批量更新自动化状态",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/delete-automations",
          label: "删除自动化",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
