import React from "react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import UserPanel from "../user-panel/UserPanel";
import "./Header.scss";
import { Template } from "devextreme-react/core/template";
import { useScreenSize } from "../../utils/media-query";
import { PopupHeaderText } from "../typographyText/TypograghyText";
import AddItem from "../add-item-dropdown/AddItem";

export default function Header({ menuToggleEnabled, title, toggleMenu }) {
  const { isXSmall, isLarge } = useScreenSize();
  return (
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
        <Item location={"before"} cssClass={"header-title"}>
          <div style={{ marginLeft: "30px" }}>
            <PopupHeaderText text={"Hello, Welcome Admin"} />
          </div>
        </Item>

        <Item
          location={"after"}
          locateInMenu={"auto"}
          menuItemTemplate={"addPanelTemplate"}
        >
          <Button stylingMode={"text"} className="add-button">
            <AddItem menuMode={"context"} />
          </Button>
        </Item>

        <Item location={"after"} cssClass={"nav-icons"}>
          <Button stylingMode={"text"} icon="bell"></Button>
        </Item>
        <Item
          location={"after"}
          locateInMenu={"auto"}
          menuItemTemplate={"userPanelTemplate"}
        >
          <Button className={"user-button authorization"} stylingMode={"text"}>
            <UserPanel menuMode={"context"} />
          </Button>
        </Item>
        <Template name={"userPanelTemplate"}>
          <UserPanel menuMode={"list"} />
        </Template>
        <Template name={"addPanelTemplate"}>
          <AddItem menuMode={"list"} />
        </Template>
      </Toolbar>
    </header>
  );
}
