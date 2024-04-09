import React from "react";
import ScrollView from "devextreme-react/scroll-view";
import "./single-card.scss";
import Logo from "../../assets/icon/loginLogo.png";

export default function SingleCard({ title, description, children }) {
  return (
    <ScrollView
      height={"100%"}
      width={"100%"}
      className={"with-footer single-card"}
    >
      <div className={"dx-card content"}>
        <div className={"header"}>
          <div className={"logo-container"}>
            <img src={Logo} alt="Logo" className={"logo"} />
          </div>
          <div className={"title"}>{title}</div>
          <div className={"description"}>{description}</div>
        </div>
        {children}
      </div>
    </ScrollView>
  );
}
