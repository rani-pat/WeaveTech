// ApprovalPopup.js
import React from "react";
import { Popup, TextBox, Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../components/typographyText/TypograghyText";
import { verification } from "../../assets";

const VerificationPopup = ({ isVisible, onHide }) => {
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
          <img src={verification} style={{ padding: "5px" }} />
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
        <PopupHeaderText text={"Send for Approval"} />
        <PopupSubText text={"Add remarks "} />
      </div>

      <div className="release-popup-text">
        <TextBox
          label="Remarks"
          placeholder="Input"
          height={56}
          showClearButton={true}
        />
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
          text="Discard"
          width={216}
          height={44}
          onClick={onHide}
          className="cancelQcBtn"
        />
        <Button
          text="Send"
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

export default VerificationPopup;
