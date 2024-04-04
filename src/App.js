import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
// import "./themes/custom-theme/dx.material.custom-scheme-material-compact.css";
import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "./dx-styles.scss";
import LoadPanel from "devextreme-react/load-panel";
import { NavigationProvider } from "./contexts/navigation";
import { AuthProvider, useAuth } from "./contexts/auth";
import { useScreenSizeClass } from "./utils/media-query";
import Content from "./Content";
import UnauthenticatedContent from "./UnauthenticatedContent";
import { CreateProProvider } from "./contexts/createPro";
import { HeaderProvider } from "./contexts/headerContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

export default function Root() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <CreateProProvider>
            <div className={`app ${screenSizeClass}`}>
              <HeaderProvider>
                <App />
              </HeaderProvider>
            </div>
          </CreateProProvider>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}
