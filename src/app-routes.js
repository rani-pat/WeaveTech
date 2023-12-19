import {
  HomePage,
  CreatePRO,
  IntiatePRO,
  VerifyPRO,
  VerifyInitiatePRO,
  IssuePROMain,
  GenerateIssue,
  VerifyIssuePROMain,
  VerifyIssuePRO,
  ReceiptPROMain,
  GenearteReceiptPRO,
  VerifyReceiptPROMain,
  VerifyReceiptPRO,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/create-pro",
    element: CreatePRO,
  },
  {
    path: "/create-pro/Initiate-pro",
    element: IntiatePRO,
  },
  {
    path: "/verify-pro-listing",
    element: VerifyPRO,
  },
  {
    path: "/verify-pro-listing/Verify-initiate-pro",
    element: VerifyInitiatePRO,
  },
  {
    path: "/issue-pro",
    element: IssuePROMain,
  },
  {
    path: "/issue-pro/Generate-issue",
    element: GenerateIssue,
  },
  {
    path: "/verify-issue-pro-listing",
    element: VerifyIssuePROMain,
  },
  {
    path: "/verify-issue-pro-listing/Verify-issue-pro",
    element: VerifyIssuePRO,
  },
  {
    path: "/receipt-pro",
    element: ReceiptPROMain,
  },
  {
    path: "/receipt-pro/Generate-receipt",
    element: GenearteReceiptPRO,
  },
  {
    path: "/verify-receipt",
    element: VerifyReceiptPROMain,
  },
  {
    path: "/verify-receipt/Verify-receipt-pro",
    element: VerifyReceiptPRO,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
