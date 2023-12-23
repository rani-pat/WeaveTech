import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import TreeView from "devextreme-react/tree-view";
import { navigation } from "../../app-navigation";
import { useNavigation } from "../../contexts/navigation";
import { useScreenSize } from "../../utils/media-query";
import "./SideNavigationMenu.scss";
import { Autocomplete, Button } from "devextreme-react";
import * as events from "devextreme/events";

export default function SideNavigationMenu(props) {
  const { children, selectedItemChanged, openMenu, compactMode, onMenuReady } =
    props;

  const { isLarge } = useScreenSize();
  function normalizePath() {
    return navigation.map((item) => ({
      ...item,
      expanded: isLarge,
      path: item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path,
    }));
  }

  const items = useMemo(
    normalizePath,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChanged = (e) => {
    setSearchValue(e.value);
  };
  const filterItemsRecursively = (item, searchValue) => {
    const normalizedSearchValue = (searchValue || "").toLowerCase();

    if (item.text.toLowerCase().includes(normalizedSearchValue)) {
      return true;
    }

    if (item.items && item.items.length) {
      return item.items.some((subItem) =>
        filterItemsRecursively(subItem, searchValue)
      );
    }

    return false;
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => filterItemsRecursively(item, searchValue));
  }, [items, searchValue]);

  const {
    navigationData: { currentPath },
  } = useNavigation();

  const treeViewRef = useRef(null);
  const wrapperRef = useRef();
  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", (e) => {
        openMenu(e);
      });
    },
    [openMenu]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  return (
    <div
      className={"dx-swatch-additional side-navigation-menu"}
      ref={getWrapperRef}
    >
      {compactMode && (
        <div className="search-icon">
          <Button icon="search" />
        </div>
      )}
      {!compactMode && (
        <div className="search-box">
          <i className="dx-icon dx-icon-search"></i>
          <Autocomplete
            placeholder="Search the menu"
            stylingMode="outlined"
            showClearButton={true}
            displayExpr={(item) => item}
            searchExpr="name"
            className={"custom-search-box"}
            value={searchValue}
            onValueChanged={handleSearchValueChanged}
          />
        </div>
      )}
      {children}
      <div className={"menu-container"}>
        <TreeView
          ref={treeViewRef}
          // items={items}
          items={filteredItems}
          keyExpr={"path"}
          selectionMode={"single"}
          focusStateEnabled={false}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={"100%"}
        />
      </div>
    </div>
  );
}
