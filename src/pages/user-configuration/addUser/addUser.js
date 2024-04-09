import React, { useState, useEffect } from "react";
import {
  HeaderText,
  SubText,
  PopupHeaderText,
  PopupSubText,
} from "../../../components/typographyText/TypograghyText";
import {
  Button as NormalButton,
  Popup,
  TextBox,
  NumberBox,
  Button,
  SelectBox,
} from "devextreme-react";
import { Validator, RequiredRule } from "devextreme-react/validator";
import DataGrid, {
  Column,
  SearchPanel,
  Paging,
  Scrolling,
  Item,
  Toolbar,
  Pager,
} from "devextreme-react/data-grid";
import { navigation } from "../../../app-navigation";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import "./addUser.scss";
import { getUserData, saveUser } from "../../../api/userConfiguration";
import { toastDisplayer } from "../../../components/toastDisplayer/toastdisplayer";
// import Triangleloader from "../../../components/loader/Loader";

const AddUser = () => {
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [userGridData, setUserGridData] = useState([]);
  const [loading, setloading] = useState(false);

  const getAllUserData = async (whsCode) => {
    setloading(true);
    try {
      const response = await getUserData();
      setloading(false);
      console.log("response", response);
      setUserGridData(response.responseData);
    } catch {
      setloading(true);
      return toastDisplayer("error", "Something went wrong..!!");
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  const addUserHandler = () => {
    setAddUserPopUp(true);
    console.log("btn click");
  };
  const handleCancel = () => {
    setAddUserPopUp(false);
  };

  return (
    <>
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro-auth">
          <div className="title-section">
            <HeaderText text={"Users"} />
          </div>
          <div className="title-section-btn">
            <NormalButton
              text="New User"
              height={44}
              width={144}
              type="default"
              onClick={addUserHandler}
              icon="plus"
            />
          </div>
        </div>
      </div>
      {/* {loading ? (
        <Triangleloader />
      ) : ( */}
      <div className="content-block dx-card">
        <div className="data-grid-container data-grid">
          <DataGrid
            dataSource={userGridData}
            keyExpr="user_ID"
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={false}
            hoverStateEnabled={true}
            defaultFocusedRowIndex={0}
            // onSelectionChanged={handleDataGridRowSelection}
            // ref={UserDataGridRef}
          >
            <Paging defaultPageSize={5} />
            <Pager
              visible={true}
              // showInfo={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            <SearchPanel visible={true} style={{ minWidth: "300px" }} />
            <Scrolling columnRenderingMode="virtual" />

            <Column dataField={"user_Name"} caption={"User Name"}></Column>
            <Column
              alignment={"left"}
              dataField={"user_Email"}
              caption={"User Email"}
            ></Column>
            <Column
              alignment={"left"}
              dataField={"mobile_No"}
              caption={"Mobile No"}
            ></Column>
            <Column
              alignment={"left"}
              dataField={"gender"}
              caption={"Gender"}
            ></Column>
            <Toolbar className="toolbar-item">
              <Item location="before">
                <div className="informer">
                  <SubText text={"All Users"} />
                </div>
              </Item>
              <Item name="searchPanel" />
            </Toolbar>
            {/* <Column
                    alignment={"left"}
                    dataField={"isActive"}
                    caption={"Is Active"}
                  ></Column> */}
          </DataGrid>
        </div>
      </div>
      {/* )} */}
      {addUserPopUp && (
        <Popup
          visible={true}
          showCloseButton={false}
          dragEnabled={false}
          showTitle={false}
          height={"55%"}
          width={"90vw"}
          // hideOnOutsideClick={outsideClickHandler}
          className="UserForm"
          contentRender={() => (
            <AddUserPopupContent
              handleCancel={handleCancel}
              setAddUserPopUp={setAddUserPopUp}
              getUserData={getAllUserData}
            />
          )}
        ></Popup>
      )}
    </>
  );
};

function AddUserPopupContent({ handleCancel, setAddUserPopUp, getUserData }) {
  const [selectedGen, setSelectedGen] = useState(null);
  const [formData, setFormData] = useState({
    user_Name: null,
    user_Password: null,
    user_Email: "",
    mobile_No: 0,
    department: "",
    gender: "",
    isActive: "Y",
    // Add other fields as needed
  });
  const gender = ["Male", "Female", "Prefer not to say"];
  const handleSave = async () => {
    if (formData.user_Name && formData.user_Password) {
      console.log("saving", formData);

      const response = await saveUser(formData);
      if (response.hasError) {
        return toastDisplayer("error", response.errorMessage);
      } else {
        setAddUserPopUp(false);
        getUserData();
        return toastDisplayer("success", "User added successfully...!!");
      }
    }
  };
  const handleUserName = (e) => {
    console.log("formData : ", formData);
    setFormData({
      ...formData,
      ["user_Name"]: e.value,
    });
  };
  const handlePassword = (e) => {
    console.log("formData : ", formData);
    setFormData({
      ...formData,
      ["user_Password"]: e.value,
    });
  };
  const handleEmail = (e) => {
    console.log("formData : ", formData);
    setFormData({
      ...formData,
      ["user_Email"]: e.value,
    });
  };
  const handleMoNo = (e) => {
    console.log("formData : ", formData);
    setFormData({
      ...formData,
      ["mobile_No"]: e.value,
    });
  };

  const handleGender = (e) => {
    console.log("formData : ", formData);
    setSelectedGen(e.itemData);
    console.log(e.itemData);
    setFormData({
      ...formData,
      ["gender"]: e.itemData,
    });
  };

  return (
    <>
      <form>
        <div className="addUserForm-header">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <PopupHeaderText text={"Create New user"} />
            <PopupSubText text={"You can create new user profile"} />
          </div>
          <div className="close-btn-section">
            <Button icon="close" onClick={handleCancel} />
          </div>
        </div>
        <div className="addUserForm-body">
          <div className="assUser-subDiv1">
            <TextBox
              className="form-element txt-remark"
              stylingMode="outlined"
              label={"User Name"}
              showClearButton={true}
              onValueChanged={handleUserName}
              defaultValue={""}
              height={40}
            >
              <Validator>
                <RequiredRule message="User Name is required" />
              </Validator>
            </TextBox>
            <TextBox
              // className="dx-field-value"
              className="form-element txt-remark"
              stylingMode="outlined"
              label={"Password"}
              mode="password"
              showClearButton={true}
              onValueChanged={handlePassword}
              defaultValue={""}
              height={40}
            >
              <Validator>
                <RequiredRule message="Password is required" />
              </Validator>
            </TextBox>
          </div>
          <div className="assUser-subDiv1">
            <TextBox
              // className="dx-field-value"
              className="form-element txt-remark emailbox"
              stylingMode="outlined"
              label={"Email"}
              // width={160}
              showClearButton={true}
              onValueChanged={handleEmail}
              defaultValue={""}
              height={40}
            ></TextBox>
            <div className="assUser-subDiv1-subDiv2">
              <NumberBox
                // className="dx-field-value"
                className="form-element txt-remark"
                stylingMode="outlined"
                label={"Mobile No"}
                // width={160}
                showClearButton={true}
                onValueChanged={handleMoNo}
                width={"100%"}
                defaultValue={""}
                height={40}
              ></NumberBox>

              <SelectBox
                items={gender}
                // defaultValue={priorities[0]}
                className="form-element txt-remark"
                width={"100%"}
                stylingMode="outlined"
                label={"Gender"}
                height={40}
                onItemClick={handleGender}
                text={selectedGen ? selectedGen : "Select Gender"}
              ></SelectBox>
            </div>
          </div>
        </div>
        <div className="addUserForm-footer ">
          <div
            className="btns-section-save "
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "20px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button
              text="Cancel"
              width={124}
              height={35}
              onClick={handleCancel}
            />
            <Button
              text="Save"
              type="default"
              className="dx-saveBtn"
              width={124}
              height={35}
              onClick={handleSave}
              useSubmitBehavior={true}
              // disabled={selectedRowKeys.length > 0 ? false : true}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default AddUser;
