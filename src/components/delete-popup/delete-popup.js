// ApprovalPopup.js
import React from "react";
import { Popup, TextBox, Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../components/typographyText/TypograghyText";

const DeletePopup = ({ isVisible, onHide }) => {
  return (
    <Popup
      visible={isVisible}
      onHiding={onHide}
      width={480}
      height={220}
      showCloseButton={false}
      dragEnabled={false}
      showTitle={false}
    >
      <div className="release-popup-main">
        <div className="popup-back-btn">
          <Button icon="trash" />
        </div>
        <div className="popup-close-btn">
          <Button icon="close" onClick={onHide} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginTop: "20px",
        }}
      >
        <PopupHeaderText text={"Are you sure you want to delete?"} />
        <PopupSubText text={"Do you want to discard changes and go back? "} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: "24px",
        }}
      >
        <Button
          text="No"
          width={216}
          height={44}
          onClick={onHide}
          className="cancelQcBtn"
        />
        <Button
          text="Yes"
          type="default"
          width={216}
          height={44}
          onClick={onHide}
          className="OkQcBtn"
        />
      </div>
    </Popup>
  );
};

export default DeletePopup;
