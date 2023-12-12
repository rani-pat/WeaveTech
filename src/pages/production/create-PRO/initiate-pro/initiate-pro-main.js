import React, { useState } from "react";
import {
  HeaderText,
  SubText,
} from "../../../../components/typographyText/TypograghyText";
import "../create_pro.scss";
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
import { PopupIcon, DeleteIcon } from "../../../../assets";
import Breadcrumbs from "../../../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../../../app-navigation";
import routes from "../../../../app-routes";
import ProjectPopup from "./project-popup";

import DataGrid, {
  Column,
  Lookup,
  SearchPanel,
  Paging,
  ColumnChooser,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const IntiatePRO = () => {
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [ProjectPopupVisible, setProjectPopupVisible] = useState(null);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleCancelProjectPopup = () => {
    setProjectPopupVisible(false);
  };
  const NewItemsOptions = {
    icon: PopupIcon,
    onClick: () => setProjectPopupVisible(true),
  };
  let dataGrid;

  return (
    <>
      <Popup
        visible={ProjectPopupVisible}
        onHiding={handleCancelProjectPopup}
        height={window.innerHeight - 200}
        showTitle={false}
        className="initate-popup-css"
      >
        <ProjectPopup
          handleCancel={handleCancelProjectPopup}
          title="List of Bill of Materials"
          caption="Choose the product you want to produce "
        />
      </Popup>
      <Breadcrumbs navigation={navigation} routes={routes} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Initiate New Production Order"} />
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
      <div className="content-block dx-card responsive-paddings">
        <div className="expandable-text" onClick={handleToggleExpand}>
          Additional Information, make changes
          {isExpanded ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              style={{ marginLeft: "25px" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ marginLeft: "25px" }}
            />
          )}
        </div>
        {isExpanded && (
          <>
            <div className="additional-information">
              <SelectBox
                id="planed-qty"
                label="Planned Qty"
                height={56}
                showClearButton={true}
              />
              <SelectBox
                id="umo"
                label="UOM"
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
              <TextBox
                id="series"
                label="Series"
                placeholder="Input"
                height={56}
                showClearButton={true}
              />
              <SelectBox
                id="doc-number"
                label="Doc Number"
                height={56}
                showClearButton={true}
              />
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
                id="start-date"
                label="Start Date"
                height={56}
                displayFormat="yyyy-MM-dd"
                // placeholder="Start Date"
                stylingMode="outlined"
                showClearButton={true}
              />
              <DateBox
                id="due-date"
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
                id="order-date"
                label="Order Date"
                height={56}
                displayFormat="yyyy-MM-dd"
                // placeholder="Order Date"
                stylingMode="outlined"
                showClearButton={true}
              />
              <SelectBox
                id="linked-to"
                label="Linked To"
                height={56}
                showClearButton={true}
              />
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

              <Item location="after">
                <TextBox placeholder="Add New Item" width={165}>
                  <TextBoxButton
                    name="popupSearch"
                    location="after"
                    options={NewItemsOptions}
                    height={44}
                    className="popup-icon"
                  />
                </TextBox>
              </Item>
              <Item location="after">
                <Button icon={DeleteIcon} />
              </Item>
              <Item name="columnChooserButton" />
            </Toolbar>
          </DataGrid>
        </div>
      </div>
    </>
  );
};
export default IntiatePRO;
