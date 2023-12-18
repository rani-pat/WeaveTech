// import "material-icons/iconfont/material-icons.css";

export const navigation = [
  {
    text: "Home",
    path: "/home",
    icon: "home",
  },
  {
    text: "Production",
    icon: "folder",
    path: "/production",
    items: [
      {
        text: "Create PRO",
        path: "/create-pro",
        icon: "add",
      },
      {
        text: "Verify Create",
        path: "/verify-pro-listing",
        icon: "checklist",
      },
      {
        text: "Issue PRO",
        path: "/issue-pro",
        icon: "import",
      },
      {
        text: "Verify Issue",
        path: "/verify-issue",
        icon: "checklist",
      },
      {
        text: "Receipt PRO",
        path: "/receipt-pro",
        icon: "arrowdown",
      },
      {
        text: "Verify Receipt",
        path: "/verify-receipt",
        icon: "checklist",
      },
      {
        text: "Return Items",
        path: "/return-items",
        icon: "hidepanel",
      },
      {
        text: "Close PRO",
        path: "/close-pro",
        icon: "deleterow",
      },
    ],
  },
];
