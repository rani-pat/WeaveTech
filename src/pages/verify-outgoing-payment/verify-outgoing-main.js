import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../app-navigation";
import {
  HeaderText,
  SubText,
} from "../../components/typographyText/TypograghyText";
import DashboardCards from "../../components/dashboard-card/dashboard-cards";
import "./verify-outgoing.scss";
import {
  addDays,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
} from "date-fns";
import DataGrid, {
  Column,
  Lookup,
  SearchPanel,
  Paging,
  ColumnChooser,
  Toolbar,
  Item,
  Pager,
  Scrolling,
  Button,
  LoadPanel,
  Position,
  Editing,
} from "devextreme-react/data-grid";
import SelectBox from "devextreme-react/select-box";
import { useNavigate } from "react-router-dom";
import { UseCreateProContext } from "../../contexts/createPro";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import {
  getAllProductionData,
  getCreateProData,
} from "../../api/verify-outgoing-pay.api";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";

const getStatusColor = (status) => {
  const statusColors = {
    Approved: "#124d22",
    Pending: "#06548b",
    Rejected: "#AD1820",
  };

  return statusColors[status] || "#000";
};

const VerifyOutgoingMain = () => {
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowCount, setSelectedRowCount] = useState(0);
  const [createData, setAllCreateData] = useState([]);
  const { setStatusValue } = UseCreateProContext();
  const navigate = useNavigate();

  const handlePopupIconClick = async (cellData) => {
    const selectedRow = cellData.row.data;
    if (selectedRow.state === "Approved") {
      setStatusValue("Approved");
    } else if (selectedRow.state === "Pending") {
      setStatusValue("Pending");
    } else if (selectedRow.state === "Rejected") {
      setStatusValue("Rejected");
    }
    try {
      const branchId = 1;
      const proId = selectedRow.proId;
      setLoading(true);
      const apiResponse = await getAllProductionData(branchId, proId);
      if (!apiResponse.hasError) {
        const productionData = apiResponse.responseData;
        if (selectedRow.state === "Rejected") {
          navigate("/outgoing-payment/verify-outgoing-state", {
            state: {
              branchId: branchId,
              proId: proId,
              productionData: productionData,
            },
          });
        } else {
          navigate("/outgoing-payment/verify-outgoing-state", {
            state: {
              branchId: branchId,
              proId: proId,
              productionData: productionData,
            },
          });
        }
      } else {
        console.error("API error:", apiResponse.errorMessage);
        toastDisplayer("error", apiResponse.errorMessage);
      }
      setLoading(false);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    setLoading(false);
  };

  const onSelectionChanged = ({ selectedRowKeys }) => {
    console.log("selectedRowKeys", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowCount(selectedRowKeys.length);
  };

  let dataGrid;
  //--------------- filtering by a date ----------------//
  let selectBoxMonth;
  let selectBoxCreatedPro;
  const monthItem = [
    { value: "Yesterday", text: "Yesterday" },
    { value: "Today's", text: "Today's" },
    { value: "LastWeek", text: "Last Week" },
    { value: "ThisMonth", text: "This Month" },
  ];

  const handleDateChange = (newStatus) => {
    setFilterDate(newStatus);
    let filterStartDate;
    let filterEndDate;

    switch (newStatus) {
      case "Today's":
        filterStartDate = addDays(new Date(), -1);
        filterEndDate = addDays(new Date(), 1);
        break;
        break;
      case "Yesterday":
        filterStartDate = addDays(new Date(), -2);
        filterEndDate = addDays(new Date(), -1);
        break;
      case "LastWeek":
        filterStartDate = startOfWeek(addDays(new Date(), -7));
        filterEndDate = endOfWeek(addDays(new Date(), -7));
        break;
      case "ThisMonth":
        filterStartDate = startOfMonth(new Date());
        filterEndDate = endOfMonth(new Date());
        break;
      default:
        filterStartDate = undefined;
        filterEndDate = undefined;
    }
    const filteredData = createData.filter((item) => {
      const postingDate = new Date(item.postingDate);
      return postingDate >= filterStartDate && postingDate <= filterEndDate;
    });

    if (dataGrid && dataGrid.instance) {
      dataGrid.instance.option("dataSource", filteredData);
      dataGrid.instance.refresh();
    }
  };

  // ------------------ filter according to state ----------------//
  const allCreatedpro = [
    { value: "All", text: "All Created Production" },
    { value: "Pending", text: "Pending Production" },
    { value: "Approved", text: "Approved Production" },
    { value: "Rejected", text: "Rejected Production" },
  ];

  const handleFilterChange = (newStatus) => {
    setFilterStatus(newStatus);
    const filterValue = newStatus === "All" ? undefined : newStatus;
    if (dataGrid && dataGrid.instance) {
      dataGrid.instance.columnOption("state", "filterValue", filterValue);
      dataGrid.instance.refresh();
    }
  };

  // ------------ create pro api call -------------------//
  useEffect(() => {
    const getCreateData = async () => {
      setLoading(true);
      const response = await getCreateProData();
      console.log("data", response.responseData);
      if (!response.hasError) {
        setLoading(false);
        setAllCreateData(response.responseData);
      }
    };
    getCreateData();
  }, []);

  return (
    <>
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Verify Outgoing Payment"} />
          </div>
        </div>
      </div>
      <DashboardCards parameter1={1} parameter2={202} />
      <div className="content-block dx-card">
        <div className="data-grid-container data-grid">
          <DataGrid
            className="on-hover-data responsive-text"
            dataSource={createData}
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={false}
            selection={{
              mode: "multiple",
            }}
            ref={(ref) => {
              dataGrid = ref;
            }}
            // selectedRowKeys={selectedRowKeys}
            onSelectionChanged={onSelectionChanged}
            hoverStateEnabled={true}
          >
            <Scrolling columnRenderingMode="virtual" />
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            <SearchPanel visible={true} />
            <ColumnChooser enabled={true}>
              <Position
                my="right top"
                at="right bottom"
                of=".dx-datagrid-column-chooser-button"
              />
            </ColumnChooser>
            <Column
              dataField={"productNo"}
              caption={"Product N0."}
              // fixed={true}
              // fixedPosition="center"
              alignment={"left"}
              width={150}
            />
            <Column type="buttons" width={80}>
              <Button onClick={(cellData) => handlePopupIconClick(cellData)}>
                <CallMadeOutlinedIcon />
              </Button>
            </Column>
            <Column
              alignment={"center"}
              dataField={"state"}
              caption={"State"}
              width={150}
              cellRender={(data) => (
                <>
                  <span className="col-main" data-type={data["value"]}>
                    <span
                      className="status-circle"
                      style={{
                        backgroundColor: getStatusColor(data["value"]),
                      }}
                    />
                    <span data-type={data["value"]}>{data["value"]}</span>
                  </span>
                </>
              )}
            />
            <Column
              alignment={"center"}
              dataField={"status"}
              caption={"status"}
              width={150}
            />
            <Column
              alignment={"center"}
              dataField={"docNum"}
              caption={"Doc Number"}
              width={150}
            />
            <Column
              alignment={"center"}
              dataField={"seriesName"}
              caption={"Series No."}
              width={150}
            />

            <Column
              alignment={"center"}
              dataField={"productName"}
              caption={"Product Name"}
              allowSorting={false}
              width={200}
            />
            <Column
              dataField={"postingDate"}
              caption={"Posting Date"}
              dataType={"date"}
              width={150}
              format="dd/MM/yyyy"
              alignment={"center"}
            />

            <Column
              alignment={"center"}
              dataField={"plannedQty"}
              caption={"Planned Qty"}
              dataType={"date"}
              width={150}
            />
            <Column
              alignment={"center"}
              dataField={"completedQty"}
              caption={"Completed Qty"}
            />
            <Column
              width={150}
              alignment={"center"}
              dataField={"project"}
              caption={"Project"}
            />
            <Column
              width={150}
              alignment={"center"}
              dataField={"whsCode"}
              caption={"whsCode"}
            />
            <Column
              width={150}
              alignment={"center"}
              dataField={"distRule"}
              caption={"Dist Rule"}
            />
            <Column
              alignment={"center"}
              width={150}
              dataField={"shift"}
              caption={"Shift"}
            />
            <Column
              alignment={"center"}
              width={150}
              dataField={"uoM"}
              caption={"UOM Code"}
            />

            <Column
              alignment={"center"}
              dataField={"remark"}
              caption={"remark"}
              width={150}
            />
            <Toolbar className="toolbar-item">
              <Item location="before">
                <div className="informer">
                  <SubText text={`All Outgoing Payment`} />
                </div>
              </Item>
              <Item name="searchPanel" />
              <Item location="after">
                <SelectBox
                  ref={(ref) => (selectBoxMonth = ref)}
                  value={filterDate}
                  // width={160}
                  items={monthItem}
                  valueExpr="value"
                  displayExpr="text"
                  onValueChanged={(e) => handleDateChange(e.value)}
                />
              </Item>
              <Item location="after">
                <SelectBox
                  ref={(ref) => (selectBoxCreatedPro = ref)}
                  value={filterStatus}
                  // width={180}
                  items={allCreatedpro}
                  valueExpr="value"
                  displayExpr="text"
                  onValueChanged={(e) => handleFilterChange(e.value)}
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

export default VerifyOutgoingMain;
