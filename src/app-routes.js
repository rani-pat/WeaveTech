import {
  AddUser,
  ChangePassword,
  HomePage,
  OutgoingPayment,
  UserAuthorization,
  UserSettingMain,
  VerifyOutgoingMain,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";
import ReportMain from "./pages/reports/report-main";

const routes = [
  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/outgoing-payment",
    element: VerifyOutgoingMain,
  },
  {
    path: "/outgoing-payment/verify-outgoing-state",
    element: OutgoingPayment,
  },
  {
    path: "/user-configurations/changePassword",
    element: ChangePassword,
  },
  {
    path: "/user-configurations/addUser",
    element: AddUser,
  },
  {
    path: "/user-configurations/user-authorization",
    element: UserAuthorization,
  },
  {
    path: "/reports",
    element: ReportMain,
  },
  {
    path: "/settings",
    element: UserSettingMain,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
