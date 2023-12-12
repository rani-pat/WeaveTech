import React, { useState, useRef, useEffect } from "react";
import {
  HeaderText,
  PopupHeaderText,
  PopupSubText,
  SubText,
} from "../../../components/typographyText/TypograghyText";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../../app-navigation";
import Card from "../../../components/card/card";
import { SVG1, SVG2, SVG3, SVG4 } from "../../../assets";
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
} from "devextreme-react/data-grid";
import { SelectBox, Button, TextBox } from "devextreme-react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";

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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [finalSelected, setFinalSelected] = useState();
  const navigate = useNavigate();
  const dataGridRef = useRef();
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

  const handleInitiateClick = () => {
    navigate("/verify-pro-listing/verify-initiate-pro");
  };
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleSelectionChanged = (e) => {
    const selectedKeys = e.selectedRowKeys;

    // Allow only single selection
    if (selectedKeys.length > 1) {
      const value = dataGridRef.current.instance.selectRows(
        selectedKeys[selectedKeys.length - 1]
      );
      setFinalSelected(selectedKeys[selectedKeys.length - 1]);
    } else {
      const value = dataGridRef.current.instance.selectRows(selectedKeys[0]);
      setFinalSelected(selectedKeys[0]);
    }

    handleOpenPopup();
  };

  useEffect(() => {
    // Load data or any other initialization logic here
  }, []);

  let dataGrid;
  return (
    <>
      <Popup
        visible={isPopupVisible}
        onHiding={handleClosePopup}
        width={480}
        height={325}
        showCloseButton={false}
        dragEnabled={false}
        showTitle={false}
      >
        <div className="release-popup-main">
          <div className="popup-back-btn">
            <Button icon="back" />
          </div>
          <div className="popup-close-btn">
            <Button icon="close" onClick={handleClosePopup} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            marginTop: "20px",
          }}
        >
          <PopupHeaderText text={"Rejection"} />
          <PopupSubText text={"Add input"} />
        </div>

        <div className="release-popup-text">
          <TextBox
            label="Remarks"
            placeholder="Input"
            height={56}
            showClearButton={true}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "35px",
          }}
        >
          <Button
            text="Cancel"
            width={216}
            height={44}
            onClick={handleClosePopup}
            className="cancelQcBtn"
          />
          <Button
            text="OK"
            type="default"
            width={216}
            height={44}
            onClick={handleInitiateClick}
            className="OkQcBtn"
          />
        </div>
      </Popup>
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
        <div className="data-grid-container data-grid">
          <DataGrid
            className={"dx-card wide-card"}
            dataSource={dataSource}
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={true}
            ref={dataGridRef}
            onSelectionChanged={handleSelectionChanged}
          >
            <Paging defaultPageSize={10} />
            <Selection mode="multiple" />
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
                  <SubText text={"All PRO’s"} />
                </div>
              </Item>
              <Item name="searchPanel" />

              <Item location="after">
                <SelectBox
                  value={filterStatus}
                  onValueChanged={handleFilterChange}
                  width={200}
                />
              </Item>
              <Item location="after">
                <SelectBox
                  value={filterStatus}
                  onValueChanged={handleFilterChange}
                  width={200}
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
