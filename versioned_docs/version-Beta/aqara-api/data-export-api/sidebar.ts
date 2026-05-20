import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-Beta/aqara-api/data-export-api/data-export-api",
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
          label: "查询设备类型列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-devices",
          label: "查询设备信息列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-device-definitions",
          label: "查询设备详细信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/execute-device-trait",
          label: "通过 Trait 控制设备",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/get-trait-values",
          label: "查询 Trait 值",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/execute-device-command",
          label: "通过 Command 控制设备",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Subscription",
      link: {
        type: "doc",
        id: "version-Beta/aqara-api/data-export-api/subscription",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/mqtt-subscribe",
          label: "获取 MQTT 连接配置",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/mqtt-unsubscribe",
          label: "使 MQTT 连接配置失效",
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
          label: "查询支持自动化的端点能力列表",
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
        {
          type: "doc",
          id: "version-Beta/aqara-api/data-export-api/execute-automation-manual-trigger",
          label: "手动触发自动化",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
