import {
  HomePage,
  TasksPage,
  ProfilePage,
  CreatePRO,
  IntiatePRO,
  VerifyPRO,
  VerifyInitiatePRO,
  IssuePROMain,
  GenerateIssue,
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
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
