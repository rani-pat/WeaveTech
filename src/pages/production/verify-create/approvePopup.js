// ApprovalPopup.js
import React from "react";
import { Popup, TextBox, Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../../components/typographyText/TypograghyText";
import { approvePopupIcon } from "../../../assets";

const ApprovalPopup = ({ isVisible, onHide }) => {
  return (
    <Popup
      visible={isVisible}
      onHiding={onHide}
      width={480}
      height={325}
      showCloseButton={false}
      dragEnabled={false}
      showTitle={false}
    >
      <div className="release-popup-main">
        <div style={{ backgroundColor: "#F0F7FF" }}>
          <img src={approvePopupIcon} style={{ padding: "5px" }} />
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
        <PopupHeaderText text={"Approval"} />
        <PopupSubText text={"Add input"} />
      </div>

      <div className="release-popup-text">
        <TextBox
          label="Remarks"
          placeholder="Input"
          height={56}
          showClearButton={true}
        />
      </div>
      <div className="release-popup-text">
        <Button
          type="default"
          text="Approve"
          width={480}
          height={44}
          onClick={onHide}
        />
      </div>
    </Popup>
  );
};

export default ApprovalPopup;
