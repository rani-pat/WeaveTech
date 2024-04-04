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
import * as events from "devextreme/events";
import { bankLogo } from "../../assets";
import { PopupSubText, SubText } from "../typographyText/TypograghyText";

export default function SideNavigationMenu(props) {
  const { children, selectedItemChanged, openMenu, compactMode, onMenuReady } =
    props;
  const { isLarge } = useScreenSize();
  const [searchValue, setSearchValue] = useState("");

  function normalizePath() {
    return navigation.map((item) => ({
      ...item,
      expanded: isLarge,
      path: item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path,
    }));
  }

  const items = useMemo(normalizePath, [isLarge]);

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

  const itemRender = (itemData) => {
    return (
      <>
        {itemData.icon && (
          <i className="dx-icon material-symbols-outlined ">{itemData.icon}</i>
        )}
        <span>{itemData.text}</span>
      </>
    );
  };

  return (
    <div
      className={"dx-swatch-additional side-navigation-menu"}
      ref={getWrapperRef}
    >
      {children}
      {!compactMode && (
        <div className="bank-logo">
          <PopupSubText text={"Integrated By Bank API"} />
          <img src={bankLogo} alt="logo" />
        </div>
      )}
      <div className={"menu-container"}>
        <TreeView
          ref={treeViewRef}
          items={filteredItems}
          keyExpr={"path"}
          selectionMode={"single"}
          focusStateEnabled={false}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={"100%"}
          itemRender={itemRender}
        />
      </div>
    </div>
  );
}
