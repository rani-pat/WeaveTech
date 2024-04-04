// import "material-icons/iconfont/material-icons.css";

export const navigation = [
  {
    text: "Verify Outgoing Pay",
    path: "/outgoing-payment",
    icon: "rule",
  },
  {
    text: "Reports",
    path: "/reports",
    icon: `monitoring`,
  },
  {
    text: "User Configurations",
    icon: "manage_accounts",
    path: "/user-configurations",
    items: [
      {
        text: "Create User",
        path: "/user-configurations/addUser",
        icon: "person_add",
      },
      {
        text: "Authorisation",
        path: "/user-configurations/user-authorization",
        icon: "rule_settings",
      },
      {
        text: "Warehouse Rule",
        path: "/user-configurations/warehouse-rule",
        icon: "admin_panel_settings",
      },
      {
        text: "Notifications Rule",
        path: "/user-configurations/notifications-rule",
        icon: "location_away",
      },
    ],
  },
  {
    text: "Settings",
    path: "/settings",
    icon: `settings`,
  },
];
