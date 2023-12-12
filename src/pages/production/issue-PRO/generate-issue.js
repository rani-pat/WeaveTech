import React, { useState } from "react";
import {
  HeaderText,
  SubText,
  PopupHeaderText,
  PopupSubText,
} from "../../../components/typographyText/TypograghyText";
// import "./verify_pro.scss";
import {
  Button as NormalButton,
  Button,
  DateBox,
  TextBox,
  SelectBox,
  Popup,
} from "devextreme-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { PopupIcon } from "../../../assets";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../../app-navigation";
import routes from "../../../app-routes";

import DataGrid, {
  Column,
  Lookup,
  SearchPanel,
  Paging,
  ColumnChooser,
  Toolbar,
  Item,
  Editing,
} from "devextreme-react/data-grid";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const GenerateIssue = () => {
  const dataSource = {
    store: {
      type: "odata",
      key: "Task_ID",
      url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks",
    },
    expand: "ResponsibleEmployee",
    select: [
      "Task_ID",
      "Task_Subject",
      "Task_Start_Date",
      "Task_Due_Date",
      "Task_Status",
      "Task_Priority",
      "Task_Completion",
      "ResponsibleEmployee/Employee_Full_Name",
    ],
  };

  const priorities = [
    { name: "High", value: 4 },
    { name: "Urgent", value: 3 },
    { name: "Normal", value: 2 },
    { name: "Low", value: 1 },
  ];
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState("");

  const NewItemsOptions = {
    icon: PopupIcon,
  };
  let dataGrid;

  const handleOpenPopup = (type) => {
    setPopupType(type);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <Breadcrumbs navigation={navigation} routes={routes} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Generate an Issue for the Production Order"} />
          </div>
          <div className="title-section-btn">
            <NormalButton
              text="For Verification"
              height={44}
              width={144}
              className="btn-disable"
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="initiate-inputs">
          <SelectBox
            id="type"
            label="Type"
            height={56}
            showClearButton={true}
          />
          <SelectBox
            id="status"
            label="Status"
            height={56}
            showClearButton={true}
          />
          <TextBox label="Product Number" placeholder="Input" height={56}>
            <TextBoxButton
              name="popupSearch"
              location="after"
              options={NewItemsOptions}
              height={44}
              width={44}
              className="popup-icon"
            />
          </TextBox>
          <TextBox
            id="product-description"
            label="Product Description"
            placeholder="Product Description"
            height={56}
            showClearButton={true}
          />
          <SelectBox
            id="shift"
            label="Shift"
            height={56}
            showClearButton={true}
          />
        </div>
      </div>

      <div className="content-block dx-card">
        <div className="data-grid-container data-grid">
          <DataGrid
            className={"dx-card wide-card"}
            dataSource={dataSource}
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={true}
            ref={(ref) => {
              dataGrid = ref;
            }}
          >
            <Paging defaultPageSize={10} />

            <SearchPanel visible={true} width={300} />
            <ColumnChooser enabled={true} />

            <Column
              dataField={"Task_Subject"}
              width={190}
              caption={"Subject"}
            />
            <Column dataField={"Task_Status"} caption={"Status"} />
            <Column dataField={"Task_Priority"} caption={"Priority"}>
              <Lookup
                dataSource={priorities}
                valueExpr={"value"}
                displayExpr={"name"}
              />
            </Column>
            <Column
              dataField={"ResponsibleEmployee.Employee_Full_Name"}
              caption={"Assigned To"}
              allowSorting={false}
            />
            <Column
              dataField={"Task_Start_Date"}
              caption={"Start Date"}
              dataType={"date"}
            />
            <Column
              dataField={"Task_Due_Date"}
              caption={"Due Date"}
              dataType={"date"}
            />
            <Toolbar className="Toolbar-Item">
              <Item location="before">
                <div className="informer">
                  <SubText text={"All the items"} />
                </div>
              </Item>

              <Item name="searchPanel" />

              <Item name="columnChooserButton" />
            </Toolbar>
          </DataGrid>
        </div>
      </div>
    </>
  );
};
export default GenerateIssue;
