import React, { useState, useRef, useEffect } from "react";
import {
  HeaderText,
  SubText,
} from "../../../components/typographyText/TypograghyText";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../../app-navigation";
import Card from "../../../components/card/card";
import { SVG1, SVG2, SVG3, SVG4, folderIcon } from "../../../assets";
import { useNavigate } from "react-router-dom";
import routes from "../../../app-routes";
import DataGrid, {
  Column,
  Lookup,
  SearchPanel,
  Paging,
  ColumnChooser,
  Toolbar,
  Item,
  Selection,
  Scrolling,
  Editing,
  Pager,
} from "devextreme-react/data-grid";
import { SelectBox, Button, TextBox } from "devextreme-react";
import "./verify_pro.scss";
import { UseVerifyProContext } from "../../../contexts/verifyPro";
import LaunchSharpIcon from "@mui/icons-material/LaunchSharp";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
const VerifyPRO = () => {
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
  const [finalSelected, setFinalSelected] = useState();
  const navigate = useNavigate();
  const dataGridRef = useRef();
  const { setStatusValue } = UseVerifyProContext();

  const handleIconClick = () => {
    const selectedRows = dataGridRef.current.instance.getSelectedRowsData();
    if (selectedRows.length === 1) {
      const selectedRow = selectedRows[0];
      if (selectedRow.Task_Status === "Completed") {
        setStatusValue("completed");
        navigate("/verify-pro-listing/Verify-initiate-pro");
      } else if (selectedRow.Task_ID === 4) {
        setStatusValue("pending");
        navigate("/verify-pro-listing/Verify-initiate-pro");
      }
    }
  };

  const handleSelectionChanged = (e) => {
    const selectedKeys = e.selectedRowKeys;
    if (dataGridRef.current && dataGridRef.current.instance) {
      if (selectedKeys.length > 1) {
        const value = dataGridRef.current.instance.selectRows(
          selectedKeys[selectedKeys.length - 1]
        );
        setFinalSelected(selectedKeys[selectedKeys.length - 1]);
      } else {
        const value = dataGridRef.current.instance.selectRows(selectedKeys[0]);
        setFinalSelected(selectedKeys[0]);
      }
    }
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
  return (
    <>
      <Breadcrumbs navigation={navigation} routes={routes} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"List of Production Order"} />
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
        <div className="data-grid-container data-grid verify-pro-datagrid">
          <DataGrid
            dataSource={dataSource}
            className="on-hover-data"
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={true}
            ref={dataGridRef}
            onSelectionChanged={handleSelectionChanged}
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
              width={100}
              cellRender={() => (
                <Button onClick={handleIconClick}>
                  <ArrowOutwardOutlinedIcon style={{ color: "#525252" }} />
                </Button>
              )}
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

export default VerifyPRO;
