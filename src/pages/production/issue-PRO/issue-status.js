import React, { useState } from "react";
import {
  HeaderText,
  SubText,
  PopupHeaderText,
  PopupSubText,
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
import { PopupIcon, DeleteIcon } from "../../../assets";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../../app-navigation";
import routes from "../../../app-routes";
import { DeletePopup } from "../../../components";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Lookup,
  SearchPanel,
  Paging,
  ColumnChooser,
  Toolbar,
  Item,
  Editing,
  Scrolling,
  Pager,
} from "devextreme-react/data-grid";
import { UseIssueProContext } from "../../../contexts/issuePro";
import VerificationPopup from "../../../components/verification-popup/verification-popup";

const getStatusColor = (status) => {
  const statusColors = {
    completed: "#124d22",
    "in progress": "#06548b",
    // Add more status types and colors as needed
  };

  return statusColors[status.toLowerCase()] || "#000"; // Default color
};

const IssueStatus = () => {
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

  const { status, setstatus } = UseIssueProContext();

  const [isExpanded, setIsExpanded] = useState(false);
  const [ProjectPopupVisible, setProjectPopupVisible] = useState(null);
  const [filterStatus, setFilterStatus] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowCount, setSelectedRowCount] = useState(0);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isVerifyPopupVisible, setIsVerifyPopupVisible] = useState(false);

  const onSelectionChanged = ({ selectedRowKeys, selectedRowsData }) => {
    console.log("onSelectionChanged", selectedRowsData);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowCount(selectedRowKeys.length);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleCancelProjectPopup = () => {
    setProjectPopupVisible(false);
  };
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

  const NewItemsOptions = {
    icon: PopupIcon,
    onClick: () => setProjectPopupVisible(true),
  };
  let dataGrid;
  let selectBoxType;
  let selectBoxStatus;
  let selectBoxSeries;
  let selectBoxShift;

  const Type = [
    { value: "Standard", text: "Standard" },
    { value: "Today's", text: "Special" },
  ];
  const Status = [{ value: "Planned", text: "Planned" }];
  const Series = [
    { value: "rt3445", text: "rt3445" },
    { value: "rt4556", text: "rt4556" },
  ];
  const Shift = [
    { value: "DayShift", text: "Day Shift" },
    { value: "NightShift", text: "Night Shift" },
  ];

  return (
    <>
      <Popup
        visible={ProjectPopupVisible}
        onHiding={handleCancelProjectPopup}
        height={window.innerHeight - 200}
        showTitle={false}
        className="initate-popup-css"
      >
        {/* <ProjectPopup
          handleCancel={handleCancelProjectPopup}
          title="List of Bill of Materials"
          caption="Choose the product you want to produce "
        /> */}
      </Popup>
      <Breadcrumbs navigation={navigation} routes={routes} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Production Order"} />
          </div>
          <div>Status : {status}</div>
          <div className="title-section-btn">
            <NormalButton
              text="For Verification"
              height={44}
              width={144}
              type="default"
              disabled={status === "completed"}
              // className="btn-disable"
              onClick={handleOpenVerifyPopup}
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="initiate-inputs">
          <SelectBox
            ref={(ref) => (selectBoxType = ref)}
            value={filterStatus}
            label="Type"
            height={56}
            showClearButton={true}
            items={Type}
            valueExpr="value"
            displayExpr="text"
          />
          <SelectBox
            ref={(ref) => (selectBoxStatus = ref)}
            value={filterStatus}
            label="Status"
            height={56}
            showClearButton={true}
            items={Status}
            valueExpr="value"
            displayExpr="text"
          />
          <TextBox
            // value={filterStatus}
            // onValueChanged={handleFilterChange}
            label="Product Number"
            placeholder="Input"
            height={56}
          >
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
            label="Product Description"
            placeholder="Product Description"
            height={56}
            showClearButton={true}
          />
          <TextBox
            label="Planned Qty"
            placeholder="Planned Qty"
            height={56}
            showClearButton={true}
          />
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="expandable-text" onClick={handleToggleExpand}>
          Additional Information, make changes
          {isExpanded ? (
            <Button icon="chevronup" style={{ marginLeft: "36px" }} />
          ) : (
            <Button icon="chevrondown" style={{ marginLeft: "36px" }} />
          )}
        </div>
        {isExpanded && (
          <>
            <div className="additional-information">
              <TextBox
                label="UOM"
                placeholder="UOM"
                height={56}
                showClearButton={true}
              />
              <DateBox
                label="Start Date"
                height={56}
                displayFormat="yyyy-MM-dd"
                // placeholder="Start Date"
                stylingMode="outlined"
                showClearButton={true}
              />
              <DateBox
                label="Due Date"
                height={56}
                displayFormat="yyyy-MM-dd"
                // placeholder="Due Date"
                stylingMode="outlined"
                showClearButton={true}
              />
              <DateBox
                label="Order Date"
                height={56}
                displayFormat="yyyy-MM-dd"
                // placeholder="Order Date"
                stylingMode="outlined"
                showClearButton={true}
              />

              <SelectBox
                ref={(ref) => (selectBoxSeries = ref)}
                value={filterStatus}
                label="Series"
                placeholder="Input"
                height={56}
                showClearButton={true}
                items={Series}
                valueExpr="value"
                displayExpr="text"
              />
              <TextBox
                label="Doc Number"
                placeholder="Input"
                height={56}
                showClearButton={true}
              />
            </div>

            <div className="additional-information">
              <TextBox
                // value={filterStatus}
                // onValueChanged={handleFilterChange}
                label="Distribution Rule"
                placeholder="Input"
                height={56}
              >
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
                // value={filterStatus}
                // onValueChanged={handleFilterChange}
                label="Warehouse"
                placeholder="Input"
                height={56}
              >
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
                // value={filterStatus}
                // onValueChanged={handleFilterChange}
                label="Project"
                placeholder="Input"
                height={56}
              >
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
                // value={filterStatus}
                // onValueChanged={handleFilterChange}
                label="Customer"
                placeholder="Input"
                height={56}
              >
                <TextBoxButton
                  name="popupSearch"
                  location="after"
                  options={NewItemsOptions}
                  height={44}
                  width={44}
                  className="popup-icon"
                />
              </TextBox>

              <SelectBox
                label="Shift"
                ref={(ref) => (selectBoxShift = ref)}
                value={filterStatus}
                height={56}
                showClearButton={true}
                items={Shift}
                valueExpr="value"
                displayExpr="text"
              />
              <TextBox
                label="Actual Weight"
                placeholder="Actual Weight"
                height={56}
                showClearButton={true}
              />
            </div>
          </>
        )}
      </div>
      <div className="content-block dx-card">
        <div className="data-grid-container data-grid">
          <DataGrid
            className="on-hover-data"
            dataSource={dataSource}
            showBorders={false}
            // columnAutoWidth={true}
            columnHidingEnabled={true}
            selection={{
              mode: "multiple",
            }}
            ref={(ref) => {
              dataGrid = ref;
            }}
            selectedRowKeys={selectedRowKeys}
            onSelectionChanged={onSelectionChanged}
            hoverStateEnabled={true}
            columnMinWidth={100}
          >
            <Editing
              allowDeleting={true}
              allowUpdating={true}
              useIcons={true}
            />
            <Scrolling columnRenderingMode="virtual"></Scrolling>
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              // showInfo={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            <SearchPanel visible={!selectedRowKeys.length} width={300} />
            <ColumnChooser enabled={!selectedRowKeys.length} />
            <Column
              dataField={"Task_Subject"}
              width={300}
              caption={"Subject"}
            />
            <Column type="buttons" width={50}>
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
            <Column
              dataField={"Task_Due_Date"}
              caption={"Due Date"}
              dataType={"date"}
            />
            <Column
              dataField={"Task_Due_Date"}
              caption={"Due Date"}
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
                    text={`All the Items (${selectedRowCount} item selected)`}
                  />
                </div>
              </Item>

              <Item name="searchPanel" />

              <Item location="after">
                <TextBox
                  placeholder="Add New Item"
                  width={165}
                  visible={!selectedRowKeys.length}
                  className="selectbox-left"
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
export default IssueStatus;
