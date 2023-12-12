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
    path: "/create-pro/initiate-pro",
    element: IntiatePRO,
  },
  {
    path: "/verify-pro-listing",
    element: VerifyPRO,
  },
  {
    path: "/verify-pro-listing/verify-initiate-pro",
    element: VerifyInitiatePRO,
  },
  {
    path: "/issue-pro",
    element: IssuePROMain,
  },
  {
    path: "/issue-pro/generate-issue",
    element: GenerateIssue,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
