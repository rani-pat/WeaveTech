// RejectionPopup.js
import React from "react";
import { Popup, TextBox, Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../../components/typographyText/TypograghyText";
import { rejectPopupIcon } from "../../../assets";

const RejectionPopup = ({ isVisible, onHide }) => {
  return (
    <Popup
      visible={isVisible}
      onHiding={onHide}
      width={480}
      height={window.innerHeight - 650}
      showCloseButton={false}
      dragEnabled={false}
      showTitle={false}
    >
      <div className="release-popup-main">
        <div style={{ backgroundColor: "rgba(218, 30, 40, 0.06)" }}>
          <img src={rejectPopupIcon} style={{ padding: "5px" }} />
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
        <PopupHeaderText text={"Rejection"} />
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
          // type="default"
          text="Rejected"
          width={480}
          height={44}
          onClick={onHide}
        />
      </div>
    </Popup>
  );
};

export default RejectionPopup;
