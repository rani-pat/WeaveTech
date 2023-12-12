import React from "react";
import "./initiate_popups.scss";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../../../components/typographyText/TypograghyText";
import { Button } from "devextreme-react";
import DataGrid, {
  Column,
  Paging,
  Scrolling,
  SearchPanel,
  Selection,
} from "devextreme-react/data-grid";

const ProjectPopup = ({ handleCancel, title, caption }) => {
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
  return (
    <>
      <div className="popup-main-cointainer search-panel-width">
        <div className="popup-header">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <PopupHeaderText text={title} />
            <PopupSubText text={caption} />
          </div>
          <div className="close-btn-section">
            <Button icon="close" onClick={handleCancel} />
          </div>
        </div>
        <div className="popup-data">
          <DataGrid
            height={window.innerHeight - 450}
            dataSource={dataSource}
            columnAutoWidth={true}
            hoverStateEnabled={true}
          >
            <SearchPanel
              visible={true}
              highlightCaseSensitive={true}
              className={"search-panel"}
            />
            <Selection mode="multiple" />
            <Paging defaultPageSize={10} />
            <Column
              dataField={"Task_Subject"}
              width={190}
              caption={"Subject"}
            />
            <Column dataField={"Task_Status"} caption={"Status"} />
            <Column dataField={"Task_Priority"} caption={"Priority"}></Column>
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
          </DataGrid>
        </div>
        <div
          className="buttons-section"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px",
            gap: "10px",
            marginTop: "35px",
          }}
        >
          <Button
            text="Cancel"
            width={124}
            height={35}
            // onClick={handleCancel}
            className="cancelQcBtn"
          />
          <Button
            text="OK"
            type="default"
            width={124}
            height={35}
            // onClick={handleSave}
            className="OkQcBtn"
          />
        </div>
      </div>
    </>
  );
};
export default ProjectPopup;
