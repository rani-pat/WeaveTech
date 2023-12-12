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
        icon: "arrowright",
      },
      {
        text: "Issue PRO",
        path: "/issue-pro",
        icon: "arrowright",
      },
      {
        text: "Verify Issue",
        path: "/verify-issue",
        icon: "arrowright",
      },
      {
        text: "Receipt PRO",
        path: "/receipt-pro",
        icon: "arrowright",
      },
      {
        text: "Verify Receipt",
        path: "/verify-receipt",
        icon: "arrowright",
      },
      {
        text: "Return Items",
        path: "/return-items",
        icon: "arrowright",
      },
      {
        text: "Close PRO",
        path: "/close-pro",
        icon: "arrowright",
      },
    ],
  },
];
