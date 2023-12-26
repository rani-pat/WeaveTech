import React, { useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { navigation } from "../../../app-navigation";
import DataGrid, {
  Column,
  Lookup,
  SearchPanel,
  Paging,
  ColumnChooser,
  Toolbar,
  Item,
  Selection,
  Pager,
} from "devextreme-react/data-grid";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { PopupIcon } from "../../../assets";
import { Button as TextBoxButton } from "devextreme-react/text-box";

const getStatusColor = (status) => {
  const statusColors = {
    completed: "#124d22",
    "in progress": "#06548b",
    // Add more status types and colors as needed
  };

  return statusColors[status.toLowerCase()] || "#000"; // Default color
};

const ClosePro = () => {
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

  const [filterStatus, setFilterStatus] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);

  const dataGridRef = useRef();
  const navigate = useNavigate();
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const NewItemsOptions = {
    icon: PopupIcon,
    // onClick: () => setProjectPopupVisible(true),
  };
  let selectBoxMonth;
  let selectBoxCreatedPro;
  const monthItem = [
    { value: "All", text: "Yesterday" },
    { value: "Today's", text: "Today's" },
    { value: "Last Week", text: "Last Week" },
    { value: "This Month", text: "This Month" },
  ];
  const allCreatedpro = [
    { value: "All", text: "All Created Production" },
    { value: "Pending Production", text: "Pending Production" },
    { value: "Approve Production", text: "Approve Production" },
    { value: "Reject Production", text: "Reject Production" },
  ];
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
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Close Production Order"} />
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
                label="Planned Qty"
                placeholder="Planned Qty"
                height={56}
                showClearButton={true}
              />
              <TextBox
                label="UOM"
                placeholder="UOM"
                height={56}
                showClearButton={true}
              />
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
                // value={filterStatus}
                // onValueChanged={handleFilterChange}
                label="Doc Number"
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
            </div>

            <div className="additional-information">
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
              <DateBox
                label="Order Date"
                height={56}
                displayFormat="yyyy-MM-dd"
                // placeholder="Order Date"
                stylingMode="outlined"
                showClearButton={true}
              />
              <TextBox
                // value={filterStatus}
                // onValueChanged={handleFilterChange}
                label="Linked To"
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
                label="Linked Order"
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
            </div>
          </>
        )}
      </div>
      <div className="content-block dx-card">
        <div className="data-grid-container data-grid verify-pro-datagrid">
          <DataGrid
            className="on-hover-data"
            dataSource={dataSource}
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={true}
            ref={dataGridRef}
            hoverStateEnabled={true}
          >
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              // showInfo={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            <Selection mode="multiple" />
            <SearchPanel visible={true} width={300} />
            <ColumnChooser enabled={true} />

            <Column
              dataField={"Task_Subject"}
              width={300}
              caption={"Subject"}
            />
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
                  <SubText text={"All PRO’s"} />
                </div>
              </Item>
              <Item name="searchPanel" />

              <Item location="after">
                <SelectBox
                  ref={(ref) => (selectBoxMonth = ref)}
                  value={filterStatus}
                  width={200}
                  className="selectbox-left"
                  items={monthItem}
                  valueExpr="value"
                  displayExpr="text"
                />
              </Item>
              <Item location="after">
                <SelectBox
                  ref={(ref) => (selectBoxCreatedPro = ref)}
                  value={filterStatus}
                  width={200}
                  className="selectbox-right"
                  items={allCreatedpro}
                  valueExpr="value"
                  displayExpr="text"
                />
              </Item>
              <Item name="columnChooserButton" />
            </Toolbar>
          </DataGrid>
        </div>
      </div>
    </>
  );
};

export default ClosePro;
