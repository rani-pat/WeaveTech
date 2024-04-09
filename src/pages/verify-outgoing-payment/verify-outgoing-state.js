import React, { useState, useEffect } from "react";
import {
  HeaderText,
  SubText,
} from "../../components/typographyText/TypograghyText";
// import "./verify_pro.scss";
import { Button, TabPanel } from "devextreme-react";
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../app-navigation";
// import ApprovalPopup from "./approvePopup";
// import RejectionPopup from "./rejectPopup";
import DataGrid, {
  Column,
  SearchPanel,
  Paging,
  ColumnChooser,
  Toolbar,
  Item,
  Pager,
  Scrolling,
  LoadPanel,
} from "devextreme-react/data-grid";
import { Tooltip } from "devextreme-react/tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import { UseCreateProContext } from "../../contexts/createPro";
import AdditionalInformation from "./additional-info";
import ApprovalPopup from "./popup/approvePopup";
import RejectionPopup from "./popup/rejectPopup";

const getStatusColor = (status) => {
  const statusColors = {
    Approved: "#124d22",
    Pending: "#06548b",
    Rejected: "#AD1820",
  };
  return statusColors[status] || "#000";
};

const OutgoingPayment = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [productionData, setProductionData] = useState({});
  const [userData, setUserData] = useState([]);
  const { status, setstatus } = UseCreateProContext();
  const [remark, setRemark] = useState("");
  const [rejectRemark, setRemarkReject] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, AuthRuleContect } = useAuth();
  useEffect(() => {
    if (user) {
      setUserData(user.UserData);
    }
  }, [user]);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleToggleExpandPay = () => {
    setIsExpanded1(!isExpanded1);
  };
  let dataGrid;

  const handleOpenPopup = (type) => {
    setPopupType(type);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  useEffect(() => {
    console.log("status", status);
    if (!status || status === null) {
      navigate("/outgoing-payment");
    }
    const { state } = location;
    if (state && state.productionData) {
      setProductionData(state.productionData[0]);
    }
    console.log("productionDataAfter", productionData);
  }, [location, status, productionData]);

  return (
    <>
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            {status === "Approved" ? (
              <HeaderText text={"Approved Production Order"} />
            ) : status === "Pending" ? (
              <HeaderText text={"Pending Production Order"} />
            ) : (
              <HeaderText text={"Rejected Production Order"} />
            )}
            <span className="header-status">
              <span
                className="status-circle"
                style={{ backgroundColor: getStatusColor(status) }}
              />
              <span data-type={status}>{status}</span>
            </span>
          </div>
          {status === "Pending" && (
            <div
              className="buttons-section"
              style={{
                display: "flex",
                // justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                text="Reject"
                width={124}
                height={44}
                onClick={() => handleOpenPopup("rejection")}
              />
              <Button
                text="Approve"
                type="default"
                width={124}
                height={44}
                onClick={() => handleOpenPopup("approval")}
              />
            </div>
          )}
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="non-changing-text">
            <div className="product-num">
              Product No. {": "}
              <span>{productionData.productNo}</span>
            </div>
            <div className="sub-text">
              Series No. {": "}
              <span>{productionData.seriesName}</span>
            </div>
            <div className="sub-text">
              Planned Qty. {": "}
              <span>{productionData.headerPlannedQty}</span>
            </div>
          </div>
          <div className="non-changing-text">
            <div className="product-num">
              Doc No. {": "} <span>{productionData.docNum}</span>
            </div>
            <div className="sub-text text-overflow">
              Reason {": "}
              <span id="reason"> {productionData.reason}</span>
              <Tooltip
                target="#reason"
                showEvent="mouseenter"
                hideEvent="mouseleave"
                hideOnOutsideClick={false}
              >
                <span>{productionData.reason}</span>
              </Tooltip>
            </div>
            <div className="sub-text text-overflow">
              Remark {": "}
              <span id="remark"> {productionData.remark} </span>
              <Tooltip
                target="#remark"
                showEvent="mouseenter"
                hideEvent="mouseleave"
                hideOnOutsideClick={false}
              >
                <span> {productionData.remark}</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <AdditionalInformation
        productionData={productionData}
        isExpanded={isExpanded}
        handleToggleExpand={handleToggleExpand}
      />
      <div className="content-block dx-card responsive-paddings">
        <div className="expandable-text" onClick={handleToggleExpandPay}>
          Payment Method, take a look
          {isExpanded1 ? (
            <Button icon="chevronup" />
          ) : (
            <Button icon="chevrondown" />
          )}
        </div>
        {isExpanded1 && (
          <TabPanel id="tabPanel" deferRendering={false} showBorders={false}>
            <Item title="Bank Transfer">
              <div className="additional-information-text">
                <div className="additional-text1">
                  <div className="add-head-text">Product Description</div>
                  <div className="add-sub-text text-overflow" id="product1">
                    {productionData.productName}
                  </div>
                  <Tooltip
                    target="#product1"
                    showEvent="mouseenter"
                    hideEvent="mouseleave"
                    hideOnOutsideClick={false}
                  >
                    <div> {productionData.productName}</div>
                  </Tooltip>
                </div>
                <div className="additional-text1">
                  <div className="add-head-text">Type</div>
                  <div className="add-sub-text">{productionData.type}</div>
                </div>
                <div className="additional-text1">
                  <div className="add-head-text">UOM</div>
                  <div className="add-sub-text">{productionData.headerUoM}</div>
                </div>
                <div className="additional-text1">
                  <div className="add-head-text">Start Date</div>
                  <div className="add-sub-text">
                    {new Date(productionData.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="additional-text1">
                  <div className="add-head-text">Due Date</div>
                  <div className="add-sub-text">
                    {new Date(productionData.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="additional-text1">
                  <div className="add-head-text">Order Date</div>
                  <div className="add-sub-text">
                    {new Date(productionData.postingDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Item>
            <Item title="Cheque">
              <DataGrid
                className="on-hover-data"
                dataSource={productionData.proDetail}
                showBorders={false}
                columnAutoWidth={true}
                columnHidingEnabled={false}
                ref={(ref) => {
                  dataGrid = ref;
                }}
                hoverStateEnabled={true}
              >
                <LoadPanel enabled={false} />
                <Paging defaultPageSize={10} />
                <Pager
                  visible={true}
                  // showInfo={true}
                  displayMode="compact"
                  showNavigationButtons={true}
                />
                <Scrolling columnRenderingMode="virtual"></Scrolling>
                <Column dataField={"detailItemCode"} caption={"item code"} />
                <Column
                  dataField={"detailItemName"}
                  caption={"item Description"}
                  allowSorting={false}
                  width={200}
                />
                <Column
                  dataField={"baseQty"}
                  caption={"Base Qty"}
                  alignment={"center"}
                />
                <Column
                  dataField={"baseRatio"}
                  caption={"Base Ratio"}
                  alignment={"center"}
                />
                <Column
                  dataField={"detailPlannedQty"}
                  caption={"Planned Qty"}
                  alignment={"center"}
                />
                <Column
                  dataField={"issuedQty"}
                  caption={"Issued qty"}
                  alignment={"center"}
                />
                <Column
                  dataField={"availQty"}
                  caption={"Available QTY"}
                  alignment={"center"}
                />
                <Column
                  dataField={"detailUoM"}
                  caption={"UOM Code"}
                  alignment={"center"}
                />
                <Column
                  dataField={"detailWhsCode"}
                  caption={"whs Code"}
                  alignment={"center"}
                />
                <Column
                  dataField={"issueType"}
                  caption={"issue type"}
                  alignment={"center"}
                />
                <Column
                  dataField={"inStock"}
                  caption={"in stock"}
                  alignment={"center"}
                />
              </DataGrid>
            </Item>
          </TabPanel>
        )}
      </div>

      <div className="content-block dx-card">
        <div className="data-grid-container data-grid">
          <DataGrid
            className="on-hover-data"
            dataSource={productionData.proDetail}
            showBorders={false}
            columnAutoWidth={true}
            columnHidingEnabled={false}
            ref={(ref) => {
              dataGrid = ref;
            }}
            hoverStateEnabled={true}
          >
            <LoadPanel enabled={false} />
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              // showInfo={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            <Scrolling columnRenderingMode="virtual"></Scrolling>

            <SearchPanel visible={true} />
            <ColumnChooser enabled={true} />

            <Column dataField={"detailItemCode"} caption={"item code"} />

            <Column
              dataField={"detailItemName"}
              caption={"item Description"}
              allowSorting={false}
              width={200}
            />
            <Column
              dataField={"baseQty"}
              caption={"Base Qty"}
              alignment={"center"}
            />
            <Column
              dataField={"baseRatio"}
              caption={"Base Ratio"}
              alignment={"center"}
            />
            <Column
              dataField={"detailPlannedQty"}
              caption={"Planned Qty"}
              alignment={"center"}
            />
            <Column
              dataField={"issuedQty"}
              caption={"Issued qty"}
              alignment={"center"}
            />
            <Column
              dataField={"availQty"}
              caption={"Available QTY"}
              alignment={"center"}
            />
            <Column
              dataField={"detailUoM"}
              caption={"UOM Code"}
              alignment={"center"}
            />
            <Column
              dataField={"detailWhsCode"}
              caption={"whs Code"}
              alignment={"center"}
            />
            <Column
              dataField={"issueType"}
              caption={"issue type"}
              alignment={"center"}
            />
            <Column
              dataField={"inStock"}
              caption={"in stock"}
              alignment={"center"}
            />

            <Toolbar className="Toolbar-Item">
              <Item location="before">
                <div className="informer">
                  <SubText text={"All the items"} />
                </div>
              </Item>

              <Item name="searchPanel" />

              <Item name="columnChooserButton" />
            </Toolbar>
          </DataGrid>
        </div>
      </div>
      <ApprovalPopup
        isVisible={isPopupVisible && popupType === "approval"}
        onHide={handleClosePopup}
        // saveFunction={handlesaveApprove}
        setRemark={setRemark}
      />
      <RejectionPopup
        isVisible={isPopupVisible && popupType === "rejection"}
        onHide={handleClosePopup}
        // saveFunction={handlesaveReject}
        setRemark={setRemarkReject}
      />
    </>
  );
};

export default OutgoingPayment;
