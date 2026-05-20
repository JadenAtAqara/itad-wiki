import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-Beta/aqara-api/aiot-api/aiot-api",
    },
    {
      type: "category",
      label: "Subscription",
      link: {
        type: "doc",
        id: "version-Beta/aqara-api/aiot-api/subscription",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "version-Beta/aqara-api/aiot-api/mqtt-subscribe",
          label: "获取 MQTT 连接配置",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-api/aiot-api/mqtt-unsubscribe",
          label: "使 MQTT 连接配置失效",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
