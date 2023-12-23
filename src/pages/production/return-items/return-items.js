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
  Editing,
} from "devextreme-react/data-grid";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { PopupIcon } from "../../../assets";
import { Button as TextBoxButton } from "devextreme-react/text-box";

const ReturnItems = () => {
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
  let selectBoxSeries;

  const Type = [
    { value: "Standard", text: "Standard" },
    { value: "Today's", text: "Special" },
  ];
  const Series = [
    { value: "rt3445", text: "rt3445" },
    { value: "rt4556", text: "rt4556" },
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
            label="Period Indicator"
            height={56}
            showClearButton={true}
            items={Type}
            valueExpr="value"
            displayExpr="text"
          />
          <SelectBox
            ref={(ref) => (selectBoxSeries = ref)}
            value={filterStatus}
            label="Series"
            height={56}
            showClearButton={true}
            items={Series}
            valueExpr="value"
            displayExpr="text"
          />
          <TextBox
            // value={filterStatus}
            // onValueChanged={handleFilterChange}
            label="Production Number"
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
            label="Reference Number"
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
            label="Posting Date"
            height={56}
            displayFormat="yyyy-MM-dd"
            // placeholder="Due Date"
            stylingMode="outlined"
            showClearButton={true}
          />
        </div>
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
            <Editing
              allowDeleting={true}
              allowUpdating={true}
              useIcons={true}
            />
            <SearchPanel visible={true} width={300} />
            <ColumnChooser enabled={true} />
            <Column
              dataField={"Task_Subject"}
              width={300}
              caption={"Subject"}
            />
            <Column type="buttons" width={100}>
              <Button name="edit" />
              <Button name="delete" />
            </Column>
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

export default ReturnItems;
