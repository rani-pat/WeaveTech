// ApprovalPopup.js
import React, { useEffect, useState } from "react";
import { Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../components/typographyText/TypograghyText";

import DataGrid, {
  Column,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  Selection,
} from "devextreme-react/data-grid";
import Triangleloader from "../../components/loader/Loader";

const ReportPopup = ({
  handleCancel,
  handleSave,
  apiCallFun,
  keyExpr,
  columns,
  handleDataGridRowSelection,
  dataGridRef,
  selectedRowKeys,
  title,
  caption,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeysNew, setSelectedRowKeysNew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataGridDataHandler = async () => {
      if (apiCallFun) {
        setLoading(false);
        setDataSource(apiCallFun);
      }
      setSelectedRowKeysNew(selectedRowKeys);
    };
    dataGridDataHandler();
  }, []);

  const handleDataGridRowSelectionTemp = ({ selectedRowKeys }) => {
    setSelectedRowKeysNew(selectedRowKeys);
    handleDataGridRowSelection({ selectedRowKeys });
  };

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
        {loading ? (
          <Triangleloader />
        ) : (
          <div className="popup-data verify-pro-datagrid">
            <DataGrid
              height={window.innerHeight - 270}
              dataSource={dataSource}
              keyExpr={keyExpr}
              showBorders={false}
              columnAutoWidth={true}
              hoverStateEnabled={true}
              columnHidingEnabled={false}
              onSelectionChanged={handleDataGridRowSelectionTemp}
              ref={dataGridRef}
              selectedRowKeys={selectedRowKeysNew}
              columnMinWidth={100}
            >
              <Selection mode="multiple" />
              <SearchPanel
                visible={true}
                highlightCaseSensitive={true}
                className={"search-panel"}
              />
              <Scrolling columnRenderingMode="virtual" />
              <Paging defaultPageSize={10} />
              <Pager
                visible={true}
                displayMode="compact"
                showNavigationButtons={true}
              />
              {columns &&
                columns.map((value, key) => (
                  <Column
                    key={key}
                    dataField={value["field"]}
                    caption={value["caption"]}
                    hidingPriority={6}
                    alignment={"left"}
                  ></Column>
                ))}
            </DataGrid>
          </div>
        )}

        <div
          className="buttons-section"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Button
            text="Cancel"
            width={124}
            height={35}
            onClick={handleCancel}
            className="cancelQcBtn"
          />
          <Button
            text="Add"
            type="default"
            width={124}
            height={35}
            // onClick={handleGridSave}
            onClick={handleSave}
            className="OkQcBtn"
          />
        </div>
      </div>
    </>
  );
};

export default ReportPopup;
