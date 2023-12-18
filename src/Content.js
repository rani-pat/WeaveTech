import { Routes, Route, Navigate } from "react-router-dom";
import appInfo from "./app-info";
import routes from "./app-routes";
import { SideNavOuterToolbar as SideNavBarLayout } from "./layouts";
import { Footer } from "./components";
import { SearchPanel } from "devextreme-react/tree-list";

export default function Content() {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer>
        Copyright © {new Date().getFullYear()}-{new Date().getFullYear() + 1}{" "}
        Quantum It Solution
        {/* <br />
        All trademarks or registered trademarks are property of their respective
        owners. */}
      </Footer>
    </SideNavBarLayout>
  );
}
