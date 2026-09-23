import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-Beta/aqara-developer/data-export-api/data-export-api",
    },
    {
      type: "doc",
      id: "version-Beta/aqara-developer/data-export-api/websocket-api",
      label: "WebSocket Playground",
    },
    {
      type: "category",
      label: "Space",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/space",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-spaces",
          label: "查询空间列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/create-space",
          label: "创建空间",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/update-space-name",
          label: "修改空间名称",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/delete-space",
          label: "删除空间",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Device",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/device",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-device-types",
          label: "查询设备类型列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-devices",
          label: "查询设备信息列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-device-definitions",
          label: "查询设备模型定义",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-matched-device-capabilities",
          label: "查询设备匹配能力",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/execute-device-trait",
          label: "通过 Trait 控制设备",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-trait-values",
          label: "查询 Trait 值",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/execute-device-command",
          label: "通过 Command 控制设备",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/execute-device-command-await",
          label: "向设备下发 Command 并等待响应",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/query-device-point-info",
          label: "批量查询设备点位信息",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/update-device-name",
          label: "修改设备名称",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/update-device-point-name",
          label: "修改设备点位名称",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/delete-device-point",
          label: "删除设备点位",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/add-virtual-device",
          label: "添加虚拟设备",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/bind-virtual-device-points",
          label: "绑定源设备功能点",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/unbind-virtual-device-points",
          label: "解绑源设备功能点",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/unbind-device",
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
        id: "version-Beta/aqara-developer/data-export-api/gateway",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-gateways",
          label: "查询网关列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/join-subdevice",
          label: "开启网关子设备添加模式",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/stop-subdevice-join",
          label: "关闭网关子设备添加模式",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-device-bind-result",
          label: "查询子设备入网结果",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Resource",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/resource",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/list-resource-types",
          label: "查询开放资源类型目录",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/describe-resource-type",
          label: "查询资源类型定义",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/query-resources",
          label: "分页查询资源",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-resource",
          label: "读取已知资源",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/update-resource",
          label: "修改已知资源属性",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/execute-resource-action",
          label: "执行资源命令",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Automation",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/automation",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-automation-capabilities",
          label: "查询支持自动化的端点能力列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/create-automation",
          label: "创建自动化",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/query-automation-list",
          label: "查询自动化列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/query-automation-details",
          label: "查询自动化详情",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/update-automation",
          label: "编辑自动化",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/update-automation-status",
          label: "批量更新自动化状态",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/update-automation-space",
          label: "批量更新自动化关联空间",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/delete-automations",
          label: "删除自动化",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/query-automation-manual-trigger-list",
          label: "获取手动触发器列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/execute-automation-manual-trigger",
          label: "执行手动触发器",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Firmware",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/firmware",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/search-upgradable-devices-firmware-by-device-ids",
          label: "按设备ID查询可升级设备固件",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/upgrade-firmware",
          label: "发起固件升级",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/search-firmware-upgrade-status",
          label: "查询固件升级进度和结果",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/cancel-upgrade-firmware",
          label: "取消固件升级",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "History",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/history",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/query-device-point-history",
          label: "查询设备点位值变化历史",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Studio",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/studio",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-studio-statistics",
          label: "获取 Studio 统计信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "EMS",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/ems",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-ems-trend-device",
          label: "查询单设备能耗趋势",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-ems-trend-space",
          label: "查询单空间能耗趋势",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-ems-total-device",
          label: "查询单设备能耗总量",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-ems-total-space",
          label: "查询单空间能耗总量",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-ems-summary-space",
          label: "查询空间能耗摘要",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-ems-summary-devices",
          label: "查询多设备能耗摘要",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Alarm",
      link: {
        type: "doc",
        id: "version-Beta/aqara-developer/data-export-api/alarm",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-alarms",
          label: "查询告警列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/delete-alarm",
          label: "删除单条告警",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/clear-alarms",
          label: "全量删除告警",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/ack-alarms",
          label: "按 uuid 批量确认告警",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/ack-alarms-by-point-id",
          label: "按测点批量确认告警",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/data-export-api/get-alarm-rules",
          label: "查询告警规则列表",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
