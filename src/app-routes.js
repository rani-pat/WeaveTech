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
  InventoryTransferMain,
  GenerateInventoryTransfer,
  VerifyTransferMain,
  GenerateVerifyTransfer,
  CreateStatus,
  IssueStatus,
  ReceiptStatus,
  InventoryTransferStatus,
  ClosePro,
  ReturnItems,
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
    path: "/create-pro/Status",
    element: CreateStatus,
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
    path: "/issue-pro/Status",
    element: IssueStatus,
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
    path: "/receipt-pro/Status",
    element: ReceiptStatus,
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
  {
    path: "/inventory-transfer",
    element: InventoryTransferMain,
  },
  {
    path: "/inventory-transfer/Status",
    element: InventoryTransferStatus,
  },
  {
    path: "/inventory-transfer/Generate-inventory-transfer",
    element: GenerateInventoryTransfer,
  },
  {
    path: "/verify-transfer",
    element: VerifyTransferMain,
  },
  {
    path: "/verify-transfer/Generate-verify-transfer",
    element: GenerateVerifyTransfer,
  },
  {
    path: "/return-items",
    element: ReturnItems,
  },
  {
    path: "/close-pro",
    element: ClosePro,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
