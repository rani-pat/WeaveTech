import React, { useState, useRef } from "react";
import {
  HeaderText,
  SubText,
} from "../../../components/typographyText/TypograghyText";
// import "./create_pro.scss";
import { Button as NormalButton, Button } from "devextreme-react";
import Card from "../../../components/card/card";
import { SVG1, SVG2, SVG3, SVG4 } from "../../../assets";
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
} from "devextreme-react/data-grid";
import SelectBox from "devextreme-react/select-box";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";

const IssuePROMain = () => {
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
  const [finalSelected, setFinalSelected] = useState();
  const dataGridRef = useRef();

  const navigate = useNavigate();

  const handleInitiateClick = () => {
    navigate("/issue-pro/Generate-issue");
  };

  const handleFilterChange = (value) => {
    setFilterStatus(value);

    // Apply filtering to the DataGrid based on the selected status
    if (value === "All") {
      // Clear the filter
      dataGrid.instance.clearFilter();
    } else {
      // Apply the filter
      dataGrid.instance.filter(["Task_Status", "=", value]);
    }
  };

  const handleSelectionChanged = (e) => {
    const selectedKeys = e.selectedRowKeys;

    if (selectedKeys.length > 1) {
      const value = dataGridRef.current.instance.selectRows(
        selectedKeys[selectedKeys.length - 1]
      );
      setFinalSelected(selectedKeys[selectedKeys.length - 1]);
    } else {
      const value = dataGridRef.current.instance.selectRows(selectedKeys[0]);
      setFinalSelected(selectedKeys[0]);
    }
  };
  let dataGrid;

  return (
    <>
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Issued Production Order"} />
          </div>
          <div className="title-section-btn">
            <Button
              text="Issue PRO"
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
        <div className="data-grid-container data-grid verify-pro-datagrid">
          <DataGrid
            className={"dx-card wide-card"}
            dataSource={dataSource}
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={true}
            selection={{
              mode: "multiple",
            }}
            selectedRowKeys={selectedRowKeys}
            onSelectionChanged={handleSelectionChanged}
            ref={dataGridRef}
          >
            <Paging defaultPageSize={10} />

            <SearchPanel visible={!selectedRowKeys.length} width={300} />
            <ColumnChooser enabled={!selectedRowKeys.length} />

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
                  <SubText text={"All Issue PRO’s"} />
                </div>
              </Item>
              <Item name="searchPanel" />

              <Item location="after">
                <SelectBox
                  value={filterStatus}
                  onValueChanged={handleFilterChange}
                  width={200}
                  className="selectbox-left"
                  visible={!selectedRowKeys.length}
                />
              </Item>
              <Item location="after">
                <SelectBox
                  value={filterStatus}
                  onValueChanged={handleFilterChange}
                  width={200}
                  visible={!selectedRowKeys.length}
                  className="selectbox-right"
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

export default IssuePROMain;
