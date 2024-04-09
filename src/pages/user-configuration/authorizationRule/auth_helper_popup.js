import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  ColumnChooser,
  Paging,
  Scrolling,
  SearchPanel,
  Selection,
  Pager,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../../../components/typographyText/TypograghyText";
// import Triangleloader from "../../../components/loader/Loader";

function AuthHelperPopupPage({
  handleCancel,
  handleSave,
  datagridData,
  keyExpr,
  columns,
  handleDataGridRowSelection,
  dataGridRef,
  selectedRowKeys,
  title,
  caption,
}) {
  const [dataSource, setDataSource] = useState(null);
  //   const [error, setError] = useState(false);
  const [selectedRowKeysN, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysNew, setSelectedRowKeysNew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const dataGridDataHandler = async () => {
      if (selectedRowKeys.length > 0) {
        setSelectedRowKeysNew([selectedRowKeys[0].user_ID]);
      }

      setDataSource(datagridData);
      // setSelectedRowKeys(selectedRowKeysN);
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
        <div className="popup-header" style={{ padding: "0px" }}>
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
        {/* {loading ? (
          <Triangleloader />
        ) : ( */}
        <div className="popup-data verify-pro-datagrid">
          <DataGrid
            height={window.innerHeight - 250}
            dataSource={dataSource}
            keyExpr={keyExpr}
            showBorders={false}
            columnAutoWidth={true}
            hoverStateEnabled={true}
            onSelectionChanged={handleDataGridRowSelectionTemp}
            ref={dataGridRef}
            selectedRowKeys={selectedRowKeysNew}
          >
            <SearchPanel
              visible={true}
              width={190}
              highlightCaseSensitive={true}
              className={"search-panel"}
            />
            {/* <ColumnChooser enabled={true} /> */}
            <Selection mode="multiple" allowSelectAll={false} />
            <Scrolling columnRenderingMode="virtual" />
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              // showInfo={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            {columns &&
              columns.map((value, key) => (
                <Column
                  alignment={"left"}
                  dataField={value["field"]}
                  caption={value["caption"]}
                  hidingPriority={6}
                ></Column>
              ))}
          </DataGrid>
        </div>
        {/* )} */}
        <div
          className="buttons-section"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px",
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
            text="OK"
            type="default"
            width={124}
            height={35}
            onClick={handleSave}
            className="OkQcBtn"
          />
        </div>
      </div>
    </>
  );
}

export default AuthHelperPopupPage;
