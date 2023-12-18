import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import List from "devextreme-react/list";
import { addIcon } from "../../assets";
import "./add_item.scss";

export default function AddItem({ menuMode }) {
  const navigate = useNavigate();

  function navigateToInitiatePRO() {
    navigate("/create-pro/Initiate-pro");
  }
  function navigateToIssueGenerate() {
    navigate("/issue-pro/Generate-issue");
  }
  const menuItems = [
    {
      text: "Initiate Production Order",
      icon: "add",
      onClick: navigateToInitiatePRO,
    },
    {
      text: "Issue for Production",
      icon: "add",
      onClick: navigateToIssueGenerate,
    },
    {
      text: "Receipt against Production",
      icon: "add",
      // onClick: navigateToProfile,
    },
    {
      text: "Inventory Transfer",
      icon: "add",
      // onClick: navigateToProfile,
    },
  ];

  return (
    <div className={"add-panel"}>
      <div className={"add-info"}>
        <div className={"add-image-container"}>
          <div
            style={{
              background: `url(${addIcon}) no-repeat `,
              backgroundSize: "cover",
            }}
            className={"add-image"}
          />
        </div>
      </div>

      {menuMode === "context" && (
        <ContextMenu
          items={menuItems}
          target={".add-button"}
          showEvent={"dxclick"}
          cssClass={"user-menu"}
        >
          <Position my={"top center"} at={"bottom center"} />
        </ContextMenu>
      )}

      {menuMode === "list" && (
        <List className={"dx-toolbar-menu-action"} items={menuItems} />
      )}
    </div>
  );
}
