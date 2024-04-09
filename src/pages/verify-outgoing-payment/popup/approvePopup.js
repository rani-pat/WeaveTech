// ApprovalPopup.js
import React, { useState } from "react";
import { Popup, TextBox, Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../../components/typographyText/TypograghyText";
import { approvePopupIcon } from "../../../assets";
import "./verification-popup.scss";
const ApprovalPopup = ({ isVisible, onHide, setRemark, saveFunction }) => {
  const [remark1, setRemark1] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const handleReamrk = async (e) => {
    await setRemark1(e);
  };
  const handleSubmit = () => {
    setIsDisabled(true);
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
        <PopupSubText text={"Add Reason"} />
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
          type="default"
          text="Approve"
          width={480}
          height={44}
          onClick={handleSubmit}
          disabled={isDisabled}
        />
      </div>
    </Popup>
  );
};

export default ApprovalPopup;
