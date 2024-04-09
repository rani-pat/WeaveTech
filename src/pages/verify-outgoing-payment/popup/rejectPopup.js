// RejectionPopup.js
import React, { useState } from "react";
import { Popup, TextBox, Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../../components/typographyText/TypograghyText";
import { rejectPopupIcon } from "../../../assets";
import "./verification-popup.scss";

const RejectionPopup = ({ isVisible, onHide, setRemark, saveFunction }) => {
  const [remark1, setRemark1] = useState("");
  const handleReamrk = async (e) => {
    await setRemark1(e);
  };
  const handleSubmit = () => {
    console.log(remark1);
    saveFunction(remark1);
    return setRemark1("");
  };

  return (
    <Popup
      visible={isVisible}
      onHiding={onHide}
      width={350}
      height={300}
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
        <PopupSubText text={"*Add Reason"} />
      </div>

      <div className="release-popup-text">
        <TextBox
          label="Reason"
          placeholder="Input"
          height={56}
          showClearButton={true}
          valueChangeEvent="keyup"
          onValueChange={handleReamrk}
        />
      </div>
      <div className="release-popup-text">
        <Button
          // type="default"
          text="Reject"
          width={480}
          height={44}
          onClick={handleSubmit}
        />
      </div>
    </Popup>
  );
};

export default RejectionPopup;
