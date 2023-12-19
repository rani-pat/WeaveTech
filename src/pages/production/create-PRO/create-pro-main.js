import React, { useState } from "react";
import {
  HeaderText,
  SubText,
} from "../../../components/typographyText/TypograghyText";
import "./create_pro.scss";
import { Button as NormalButton, Button, Popup } from "devextreme-react";
import Card from "../../../components/card/card";
import { SVG1, SVG2, SVG3, SVG4 } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../../app-navigation";
import { UseCreateProContext } from "../../../contexts/createPro";
import DataGrid, {
  Column,
  Lookup,
  SearchPanel,
  Paging,
  ColumnChooser,
  Toolbar,
  Item,
  Pager,
} from "devextreme-react/data-grid";
import SelectBox from "devextreme-react/select-box";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";

const CreatePRO = () => {
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowCount, setSelectedRowCount] = useState(0);
  const [clickedRowKey, setClickedRowKey] = useState(null);

  const { setStatusValue } = UseCreateProContext();
  const navigate = useNavigate();

  const onRowClick = (e) => {
    const clickedKey = e.data ? e.data.Task_ID : null;
    setClickedRowKey(clickedKey);
  };

  const handlePopupIconClick = () => {
    const selectedRows = dataGrid.instance.getSelectedRowsData();
    if (selectedRows.length === 1) {
      const selectedRow = selectedRows[0];
      if (selectedRow.Task_Status === "Completed") {
        setStatusValue("completed");
        navigate("/create-pro/Initiate-pro");
      } else if (selectedRow.Task_ID === 4) {
        setStatusValue("pending");
        navigate("/create-pro/Initiate-pro");
      }
    }
  };

  const handleInitiateClick = () => {
    navigate("/create-pro/Initiate-pro");
  };
  const onSelectionChanged = ({ selectedRowKeys, selectedRowsData }) => {
    console.log("onSelectionChanged", selectedRowsData);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowCount(selectedRowKeys.length);
  };

  let dataGrid;
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

  return (
    <>
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Initiated Production Order"} />
          </div>
          <div className="title-section-btn">
            <Button
              text="Initiate PRO"
              type="default"
              icon="add"
              height={44}
              width={144}
              onClick={handleInitiateClick}
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-card-create-pro">
          <Card text="160" subtext="Weekly PRO’s" imageSrc={SVG1} />
          <Card text="160" subtext="WEEKLY Pending PRO’s" imageSrc={SVG2} />
          <Card text="160" subtext="WEEKLY Verified PRO’s" imageSrc={SVG3} />
          <Card text="160" subtext="WEEKLY Rejected PRO’s" imageSrc={SVG4} />
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
            selection={{
              mode: "multiple",
            }}
            ref={(ref) => {
              dataGrid = ref;
            }}
            selectedRowKeys={selectedRowKeys}
            onSelectionChanged={onSelectionChanged}
            onSelectedRowKeysChange={onRowClick}
          >
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              // allowedPageSizes={allowedPageSizes}
              // displayMode={displayMode}
              // showPageSizeSelector={showPageSizeSelector}
              // showInfo={showInfo}
              // showNavigationButtons={showNavButtons}
            />
            <SearchPanel visible={!selectedRowKeys.length} width={300} />
            <ColumnChooser enabled={!selectedRowKeys.length} />
            <Column
              width={50}
              cellRender={(data) => (
                <div className="custom-cell">
                  {selectedRowKeys.includes(data.data.Task_ID) && (
                    <Button icon="background" onClick={handlePopupIconClick} />
                  )}
                </div>
              )}
            />
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
                  <SubText
                    text={`All PRO’s (${selectedRowCount} item selected)`}
                  />
                </div>
              </Item>
              <Item name="searchPanel" />

              <Item location="after">
                <SelectBox
                  ref={(ref) => (selectBoxMonth = ref)}
                  value={filterStatus}
                  width={200}
                  visible={!selectedRowKeys.length}
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
                  visible={!selectedRowKeys.length}
                  className="selectbox-right"
                  items={allCreatedpro}
                  valueExpr="value"
                  displayExpr="text"
                />
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
                  text="Release"
                  type="default"
                  stylingMode="text"
                  // onClick={this.onClick}
                />
              </Item>
            </Toolbar>
          </DataGrid>
        </div>
      </div>
    </>
  );
};

export default CreatePRO;
