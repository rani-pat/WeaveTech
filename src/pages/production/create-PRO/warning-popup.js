// ApprovalPopup.js
import React from "react";
import { Popup, TextBox, Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../../components/typographyText/TypograghyText";
import { warning } from "../../../assets";

const WarningPopup = ({ isVisible, onHide }) => {
  return (
    <Popup
      visible={isVisible}
      onHiding={onHide}
      width={480}
      height={181}
      showCloseButton={false}
      dragEnabled={false}
      showTitle={false}
    >
      <div className="release-popup-main">
        <div style={{ backgroundColor: "rgba(218, 30, 40, 0.06)" }}>
          <img src={warning} style={{ padding: "5px" }} />
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
          marginTop: "15px",
        }}
      >
        <PopupHeaderText text={"Only Approved ones can be released"} />
        <PopupSubText
          text={
            "This option is only available when the production order has been approved or select those that are in the approved status."
          }
        />
      </div>
    </Popup>
  );
};

export default WarningPopup;
