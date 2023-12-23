import React from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import "./style.scss";

const findMenuItem = (menuItems, path) => {
  if (!menuItems || !menuItems.length) {
    return null;
  }

  const cleanPath = path.replace(/^\//, "");

  const findRecursive = (items, currentPath) => {
    for (const item of items) {
      const cleanItemPath = (item.path || "").replace(/^\//, "");

      if (cleanItemPath === currentPath) {
        return [item];
      }

      if (item.items && Array.isArray(item.items)) {
        const nestedItems = findRecursive(item.items, currentPath);
        if (nestedItems.length > 0) {
          return [
            {
              text: item.text,
              path: item.path,
              icon: item.icon,
            },
            ...nestedItems,
          ];
        }
      }
    }

    return [];
  };

  const result = findRecursive(menuItems, cleanPath).flat();

  if (result.length === 0) {
    const route = menuItems.find((r) => r.path === cleanPath);
    return route ? [route] : [];
  }

  return result;
};

const Breadcrumbs = ({ navigation, routes }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const currentPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const menuItem = findMenuItem(navigation, currentPath);

    console.log("Result for", currentPath, ":", menuItem);

    if (!menuItem.length) {
      const route = routes.find((r) => r.path === currentPath);
      if (route) {
        return { label: route.path.split("/")[2], link: route.path };
      }
      const nestedRoute = routes.find((r) => currentPath.startsWith(r.path));
      if (nestedRoute) {
        const nestedPath = currentPath.replace(nestedRoute.path, "").slice(1);
        const nestedItems = findMenuItem(navigation, nestedRoute.path);
        const itemsLabel = nestedItems.map((item) => item.text).join(" / ");

        return {
          label: ` ${nestedPath}`,
          link: currentPath,
        };
      }
      return { label: segment, link: null };
    }

    return {
      label: menuItem.map((item) => item.text).join(" / "),
      link: currentPath,
    };
  });
  const handleRefreshClick = () => {
    window.location.reload(true);
  };

  return (
    <div className="breadcrumbs">
      <div>
        {breadcrumbItems.map((breadcrumb, index) => (
          <span key={index}>
            {index > 0 && <span> / </span>}
            {breadcrumb.link &&
            breadcrumb.label.split("/").length - 1 > index ? (
              <NavLink
                to={breadcrumb.link}
                className="breadcrumb-link"
                activeClassName="active-link"
              >
                {breadcrumb.label}
              </NavLink>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
          </span>
        ))}
      </div>
      <div className="refresh-btn" onClick={handleRefreshClick}>
        Refresh
      </div>
    </div>
  );
};

export default Breadcrumbs;
