import React, { useEffect, useState } from "react";
import { Button as NormalButton, Button } from "devextreme-react";
import DataGrid, {
  Column,
  SearchPanel,
  Paging,
  Scrolling,
  Item,
  Toolbar,
  Pager,
  Editing,
} from "devextreme-react/data-grid";
import {
  HeaderText,
  SubText,
} from "../../../components/typographyText/TypograghyText";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../../app-navigation";
import { toastDisplayer } from "../../../components/toastDisplayer/toastdisplayer";
import {
  changeUserPassword,
  getUserData,
} from "../../../api/userConfiguration";

function ChangePassword() {
  const [userGridData, setUserGridData] = useState([]);
  const getAllUserData = async (whsCode) => {
    try {
      const response = await getUserData();
      setUserGridData(response.responseData);
    } catch {
      return toastDisplayer("error", "Something went wrong..!!");
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  const saveHandler = () => {
    var updatedData = userGridData.filter(
      (item) => item.new_password != null || item.new_password == ""
    );
    if (!updatedData.length) {
      return toastDisplayer("error", "Nothing to save...!!");
    }
    updatedData.forEach(async (item) => {
      var reqObj = {
        user_Name: item.user_Name,
        user_Password: item.new_password,
      };
      var response = await changeUserPassword(reqObj);
      if (response.hasError) {
        return toastDisplayer("error", response.errorMessage);
      } else {
        return toastDisplayer(
          "success",
          `Password updated for user : ${item.user_Name}`
        );
      }
    });
  };

  return (
    <>
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro-auth">
          <div className="title-section">
            <HeaderText text={"Reset Users Password"} />
          </div>
          <div className="title-section-btn">
            <NormalButton
              text="Save"
              height={44}
              width={144}
              type="default"
              onClick={saveHandler}
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card">
        <div className="data-grid-container data-grid">
          <DataGrid
            className="on-hover-data"
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
            <Editing
              allowDeleting={true}
              allowUpdating={true}
              useIcons={true}
            />
            <Paging defaultPageSize={5} />
            <Pager
              visible={true}
              // showInfo={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            <SearchPanel visible={true} />
            <Scrolling columnRenderingMode="virtual" />

            <Column
              dataField={"user_Name"}
              caption={"User Name"}
              allowEditing={false}
              width={300}
            ></Column>
            <Column type="buttons" width={100}>
              <Button name="edit" />
              <Button name="delete" />
            </Column>
            <Column
              alignment={"left"}
              dataField={"new_password"}
              caption={"New Password"}
            ></Column>
            <Toolbar className="toolbar-item">
              <Item location="before">
                <div className="informer">
                  <SubText text={"All Users"} />
                </div>
              </Item>
              <Item name="searchPanel" />
            </Toolbar>
          </DataGrid>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
