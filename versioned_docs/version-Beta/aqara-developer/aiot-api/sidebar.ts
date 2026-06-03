import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-Beta/aqara-developer/aiot-api/aiot-api",
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
          label: "Get MQTT Connection Configuration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-Beta/aqara-developer/aiot-api/mqtt-unsubscribe",
          label: "Invalidate MQTT Connection Configuration",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
