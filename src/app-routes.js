import { HomePage, OutgoingPayment, VerifyOutgoingMain } from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

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
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
