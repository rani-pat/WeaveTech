import React, { useState } from "react";
import {
  HeaderText,
  SubText,
} from "../../../components/typographyText/TypograghyText";
import {
  Button as NormalButton,
  Button,
  DateBox,
  TextBox,
  SelectBox,
  Popup,
} from "devextreme-react";
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
  Selection,
  Pager,
} from "devextreme-react/data-grid";
import "./transfer.scss";
import { DeletePopup } from "../../../components";
import VerificationPopup from "../../../components/verification-popup/verification-popup";

const getStatusColor = (status) => {
  const statusColors = {
    completed: "#124d22",
    "in progress": "#06548b",
    // Add more status types and colors as needed
  };

  return statusColors[status.toLowerCase()] || "#000"; // Default color
};

const GenerateInventoryTransfer = () => {
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
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowCount, setSelectedRowCount] = useState(0);
  const [isVerifyPopupVisible, setIsVerifyPopupVisible] = useState(false);

  const NewItemsOptions = {
    icon: PopupIcon,
  };
  let dataGrid;

  const handleCloseDeletePopup = () => {
    setIsDeletePopupVisible(false);
  };

  const handleOpenDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };
  const handleOpenVerifyPopup = () => {
    setIsVerifyPopupVisible(true);
  };
  const handleCloseVerifyPopup = () => {
    setIsVerifyPopupVisible(false);
  };
  const onSelectionChanged = ({ selectedRowKeys, selectedRowsData }) => {
    console.log("onSelectionChanged", selectedRowsData);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowCount(selectedRowKeys.length);
  };

  return (
    <>
      <Breadcrumbs navigation={navigation} routes={routes} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Generate an Inventory Transfer"} />
          </div>
          <div className="title-section-btn">
            <NormalButton
              text="For Verification"
              height={44}
              width={144}
              type="default"
              onClick={handleOpenVerifyPopup}
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="transfer-inputs">
          <SelectBox
            label="Period Indicator"
            height={56}
            showClearButton={true}
          />
          <SelectBox label="Series" height={56} showClearButton={true} />
          <TextBox label="From Warehouse" placeholder="Input" height={56}>
            <TextBoxButton
              name="popupSearch"
              location="after"
              options={NewItemsOptions}
              height={44}
              width={44}
              className="popup-icon"
            />
          </TextBox>
          <TextBox label="To Warehouse" placeholder="Input" height={56}>
            <TextBoxButton
              name="popupSearch"
              location="after"
              options={NewItemsOptions}
              height={44}
              width={44}
              className="popup-icon"
            />
          </TextBox>
        </div>
        <div className="transfer-inputs" style={{ marginTop: "32px" }}>
          <DateBox
            label="Posting Date"
            height={56}
            displayFormat="yyyy-MM-dd"
            stylingMode="outlined"
            showClearButton={true}
          />
          <DateBox
            label="Doc Date"
            height={56}
            displayFormat="yyyy-MM-dd"
            stylingMode="outlined"
            showClearButton={true}
          />
          <SelectBox label="Price List" height={56} showClearButton={true} />
        </div>
      </div>

      <div className="content-block dx-card">
        <div className="data-grid-container data-grid">
          <DataGrid
            className="on-hover-data"
            dataSource={dataSource}
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={true}
            ref={(ref) => {
              dataGrid = ref;
            }}
            selectedRowKeys={selectedRowKeys}
            onSelectionChanged={onSelectionChanged}
            hoverStateEnabled={true}
          >
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              // showInfo={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            <Selection mode={"multiple"} />
            <Editing
              allowDeleting={true}
              allowUpdating={true}
              useIcons={true}
            />
            <SearchPanel visible={!selectedRowKeys.length} width={300} />
            <ColumnChooser enabled={!selectedRowKeys.length} />

            <Column
              dataField={"Task_Subject"}
              width={300}
              caption={"Subject"}
            />
            <Column type="buttons" width={100}>
              <Button name="edit" />
              <Button name="delete" />
            </Column>
            <Column
              dataField={"Task_Status"}
              caption={"Status"}
              width={250}
              cellRender={(data) => (
                <>
                  <span className="col-main">
                    <span
                      className="status-circle"
                      style={{ backgroundColor: getStatusColor(data["value"]) }}
                    />
                    <span data-type={data["value"]}>{data["value"]}</span>
                  </span>
                </>
              )}
            />
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
                  <SubText
                    text={`All the items  (${selectedRowCount} item selected)`}
                  />
                </div>
              </Item>
              <Item name="searchPanel" />
              <Item location="after">
                <TextBox
                  placeholder="Add New Item"
                  width={165}
                  className="selectbox-left"
                  visible={!selectedRowKeys.length > 0}
                >
                  <TextBoxButton
                    name="popupSearch"
                    location="after"
                    options={NewItemsOptions}
                    height={44}
                    className="popup-icon"
                  />
                </TextBox>
              </Item>
              <Item name="columnChooserButton" />
              <Item location="after">
                <NormalButton
                  text="Cancel"
                  type="normal"
                  stylingMode="text"
                  visible={selectedRowKeys.length > 0}
                />
              </Item>
              <Item location="after">
                <Button
                  visible={selectedRowKeys.length > 0}
                  text="Delete"
                  type="default"
                  stylingMode="text"
                  onClick={handleOpenDeletePopup}
                />
              </Item>
            </Toolbar>
          </DataGrid>
        </div>
      </div>
      <DeletePopup
        isVisible={isDeletePopupVisible}
        onHide={handleCloseDeletePopup}
      />
      <VerificationPopup
        isVisible={isVerifyPopupVisible}
        onHide={handleCloseVerifyPopup}
      />
    </>
  );
};
export default GenerateInventoryTransfer;
