import React, { useState } from "react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import UserPanel from "../user-panel/UserPanel";
import "./Header.scss";
import { Template } from "devextreme-react/core/template";
import { useScreenSize } from "../../utils/media-query";
import {
  HeaderText,
  PopupHeaderText,
  SubText,
} from "../typographyText/TypograghyText";
import NotificationDropdown from "../notification-dropdown/NotificationDropdown";
import { UseHeaderContext } from "../../contexts/headerContext";
import AddItem from "../add-item-dropdown/AddItem";

export default function Header({ menuToggleEnabled, title, toggleMenu }) {
  const { isNotifyDropdownOpen, toggleNotifyDropdown } = UseHeaderContext();
  const [notificationCount, setNotificationCount] = useState(1);

  const { isXSmall, isLarge } = useScreenSize();
  return (
    <>
      <header className={"header-component"}>
        <Toolbar className={"header-toolbar"}>
          {isXSmall && (
            <Item
              visible={menuToggleEnabled}
              location={"before"}
              widget={"dxButton"}
              cssClass={"menu-button"}
            >
              <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
            </Item>
          )}
          {!isXSmall && (
            <Item location={"before"} cssClass={"menu-button"}>
              <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
            </Item>
          )}
          {!isXSmall && (
            <Item location={"before"} cssClass={"menu-button"}>
              <img src={title} alt="site logo" className="site-logo" />
            </Item>
          )}
          {!isXSmall && (
            <Item location={"before"} cssClass={"header-title"}>
              <HeaderText text={"Weavetech"} />
            </Item>
          )}
          <Item location={"before"} cssClass={"header-title"}>
            <div style={{ marginLeft: "30px" }}>
              <PopupHeaderText text={"Hello, Welcome Admin"} />
            </div>
          </Item>
          <Item location={"after"} cssClass={"nav-icons"}>
            <div className="notification">
              <span
                className="material-symbols-outlined bell-icon"
                onClick={toggleNotifyDropdown}
              >
                notifications
              </span>
              {notificationCount == 0 ? (
                " "
              ) : (
                <span className="notify-badge">{notificationCount}</span>
              )}
            </div>
          </Item>
          <Item location={"after"} cssClass={"nav-icons"}>
            <div></div>
          </Item>
          <Item
            location={"after"}
            locateInMenu={"auto"}
            menuItemTemplate={"userPanelTemplate"}
          >
            <Button
              className={"user-button authorization"}
              stylingMode={"text"}
            >
              <UserPanel menuMode={"context"} />
            </Button>
          </Item>
          <Template name={"userPanelTemplate"}>
            <UserPanel menuMode={"list"} />
          </Template>
        </Toolbar>
      </header>
      {isNotifyDropdownOpen && <NotificationDropdown />}
    </>
  );
}
