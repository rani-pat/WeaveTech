import React, { useState, useEffect, useRef } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../../app-navigation";
import { HeaderText } from "../../../components/typographyText/TypograghyText";
import { Button, Popup, SelectBox } from "devextreme-react";
import TextBox, { Button as TextBoxButton } from "devextreme-react/text-box";
import { PopupIcon } from "../../../assets";
import AuthHelperPopupPage from "../../user-configuration/authorizationRule/auth_helper_popup";
// import "./settings.scss";
import {
  getPIData,
  getPROData,
  getUserData,
  getUserSeriesData,
  saveUserSeries,
} from "../../../api/userConfiguration";
import { toastDisplayer } from "../../../components/toastDisplayer/toastdisplayer";
import SeriesPopupPage from "./series-popup";
import { useNavigate } from "react-router-dom";
import "./user-setting.scss";

const UserSettingMain = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedSeries, setIsExpandedSeries] = useState(false);
  const [isExpandedShift, setIsExpandedShift] = useState(false);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [AuthPopUp, setAuthPopUp] = useState(false);
  const [selectedRowKeysOnChangeAuth, setSelectedRowKeysOnChangeAuth] =
    useState(null);
  const [userData, setUserData] = useState([]);
  const [PIData, setPIData] = useState([]);
  const [PROData, setPROData] = useState([]);
  const [IssueData, setIssueData] = useState([]);
  const [ReceiptData, setReceiptData] = useState([]);
  const [InvenData, setInvenData] = useState([]);
  const dataGridRefAuthRule = useRef();
  const navigate = useNavigate();
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleToggleExpandShift = () => {
    setIsExpandedShift(!isExpandedShift);
  };
  const handleToggleExpandSeries = () => {
    setIsExpandedSeries(!isExpandedSeries);
  };
  const CreateProOptions = {
    icon: PopupIcon,
    onClick: () => {
      if (selectedPISave) {
        setPROPopUp(true);
      } else {
        return toastDisplayer("error", "Select period indicator...!!");
      }
    },
  };
  const userHelpOptions = {
    icon: PopupIcon,
    onClick: () => setAuthPopUp(true),
  };
  const PeriodIndicatorOptions = {
    icon: PopupIcon,
    onClick: () => setPeriodPopUp(true),
  };
  const IssueOptions = {
    icon: PopupIcon,
    onClick: () => {
      if (selectedPISave) {
        setIssuePopUp(true);
      } else {
        return toastDisplayer("error", "Select period indicator...!!");
      }
    },
    // onClick: () => setIssuePopUp(true),
  };
  const ReceiptOptions = {
    icon: PopupIcon,
    onClick: () => {
      if (selectedPISave) {
        setReceiptPopUp(true);
      } else {
        return toastDisplayer("error", "Select period indicator...!!");
      }
    },
    // onClick: () => setReceiptPopUp(true),
  };
  const TransferOptions = {
    icon: PopupIcon,
    onClick: () => {
      if (selectedPISave) {
        setInvenPopUp(true);
      } else {
        return toastDisplayer("error", "Select period indicator...!!");
      }
    },
    // onClick: () => setInvenPopUp(true),
  };
  const CloseOptions = {
    icon: PopupIcon,
  };
  const ReturnOptions = {
    icon: PopupIcon,
  };
  // user's options
  const column = [
    // {
    //   caption: "User ID",
    //   field: "user_ID",
    // },
    {
      caption: "User Name",
      field: "user_Name",
    },
    {
      caption: "User Email",
      field: "user_Email",
    },
    {
      caption: "Mobile No",
      field: "mobile_No",
    },
  ];

  const PIDataFetch = async () => {
    const allDataList = await getPIData();
    if (allDataList && !allDataList.hasError) {
      var resData = allDataList.responseData;
      // resData = resData.filter((item) => item.user_ID !== 5);
      setPIData(resData);
    }
  };

  const PRODataFetch = async (setPI) => {
    console.log("==?", setPI);
    const allDataList = await getPROData(202, setPI);
    if (allDataList && !allDataList.hasError) {
      var resData = allDataList.responseData;
      resData = resData.filter((item) => item.user_ID !== 5);
      setPROData(resData);
    }
  };

  const IssueDataFetch = async (setPI) => {
    const allDataList = await getPROData(60, setPI);
    if (allDataList && !allDataList.hasError) {
      var resData = allDataList.responseData;
      resData = resData.filter((item) => item.user_ID !== 5);
      setIssueData(resData);
    }
  };

  const ReceiptDataFetch = async (setPI) => {
    const allDataList = await getPROData(59, setPI);
    if (allDataList && !allDataList.hasError) {
      var resData = allDataList.responseData;
      resData = resData.filter((item) => item.user_ID !== 5);
      setReceiptData(resData);
    }
  };

  const InvenDataFetch = async (setPI) => {
    const allDataList = await getPROData(67, setPI);
    if (allDataList && !allDataList.hasError) {
      var resData = allDataList.responseData;
      resData = resData.filter((item) => item.user_ID !== 5);
      setInvenData(resData);
    }
  };

  useEffect(() => {
    const userDataFetch = async () => {
      const allDataList = await getUserData();
      if (allDataList && !allDataList.hasError) {
        var resData = allDataList.responseData;
        // resData = resData.filter((item) => item.user_ID !== 5);
        setUserData(resData);
      }
    };
    userDataFetch();
    PIDataFetch();
    // PRODataFetch();
    // IssueDataFetch();
    // ReceiptDataFetch();
    // InvenDataFetch();
  }, []);

  const [selectedUserSave, setSelectedUserSave] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const handleCancel = () => {
    setSelectedRowKeysOnChangeAuth(null);
    setAuthPopUp(false);
  };
  const selectedRowSetterApprove = async (params) => {
    setSelectedRowKeysOnChangeAuth(params);
  };
  const handleDataGridRowSelectionAuthRuleUser = async ({
    selectedRowKeys,
  }) => {
    if (selectedRowKeys.length) setSelectedRowKeysOnChangeAuth(selectedRowKeys);
    else return setSelectedRowKeysOnChangeAuth(null);
    const length = await selectedRowKeys.length;
    if (selectedRowKeys.length > 1) {
      const value = await dataGridRefAuthRule.current.instance.selectRows(
        selectedRowKeys[length - 1]
      );
      return selectedRowSetterApprove(value);
    } else {
      const value = await dataGridRefAuthRule.current.instance.selectRows(
        selectedRowKeys[0]
      );
      return selectedRowSetterApprove(value);
    }
  };
  const handleSave = async () => {
    if (!selectedRowKeysOnChangeAuth) {
      return toastDisplayer("error", "Please select user...!!");
    } else {
      var response = await getUserSeriesData({
        user_ID: selectedRowKeysOnChangeAuth[0].user_ID,
      });
      if (!response.hasError) {
        var data = response.responseData;
        console.log(
          "qwerty",
          data.filter((item) => item.text === "PI")
        );
        var PIDataTemp = data.filter((item) => item.text === "PI");
        console.log("PIDataTemp[0].indicator", PIDataTemp);
        data.forEach(async (element) => {
          if (element.seriesList.length > 0) {
            if (element.text === "Create") {
              await PRODataFetch(PIDataTemp[0].seriesList);
              setSelectedPROSave(element.seriesList);
            } else if (element.text === "Issue") {
              IssueDataFetch(PIDataTemp[0].seriesList);
              setSelectedIssueSave(element.seriesList);
            } else if (element.text === "Receipt") {
              ReceiptDataFetch(PIDataTemp[0].seriesList);
              setSelectedReceiptSave(element.seriesList);
            } else if (element.text === "Transfer") {
              InvenDataFetch(PIDataTemp[0].seriesList);
              setSelectedInvenSave(element.seriesList);
            } else if (element.text === "Return") {
              // setSelectedIssueSave(element.seriesList);
            } else if (element.text === "Close") {
              // setSelectedIssueSave(element.seriesList);
            } else if (element.text === "PI") {
              setSelectedPISave(element.seriesList[0]);
            }
          } else {
            if (element.text === "Create") {
              setSelectedPROSave(null);
            } else if (element.text === "Issue") {
              setSelectedIssueSave(null);
            } else if (element.text === "Receipt") {
              setSelectedReceiptSave(null);
            } else if (element.text === "Transfer") {
              setSelectedInvenSave(null);
            } else if (element.text === "Return") {
              // setSelectedIssueSave(null);
            } else if (element.text === "Close") {
              // setSelectedIssueSave(null);
            } else if (element.text === "PI") {
              setSelectedPISave(null);
            }
          }
        });
      } else {
        setSelectedPROSave(null);
        setSelectedIssueSave(null);
        setSelectedReceiptSave(null);
        setSelectedInvenSave(null);
        setSelectedPISave(null);
      }
      setSelectedUserSave(selectedRowKeysOnChangeAuth);
      setAuthPopUp(false);
    }
    setSelectedRowKeysOnChangeAuth(null);
  };

  // ============================= PERIOD INDICATORE =============================

  const columnPI = [
    {
      caption: "indicator",
      field: "indicator",
    },
  ];

  // states
  const [PeriodPopUp, setPeriodPopUp] = useState(false);
  const [selectedPI, setSelectedPI] = useState(null);
  const [selectedPISave, setSelectedPISave] = useState(null);
  const dataGridRefPI = useRef();

  // handler functions
  const handleCancelPI = () => {
    setPeriodPopUp(false);
  };

  const handleSavePI = async () => {
    if (selectedPI) {
      setPeriodPopUp(false);
      setSelectedPISave(selectedPI[0].indicator);
      PRODataFetch(selectedPI[0].indicator);
      IssueDataFetch(selectedPI[0].indicator);
      ReceiptDataFetch(selectedPI[0].indicator);
      InvenDataFetch(selectedPI[0].indicator);
    } else {
      toastDisplayer("error", "Please select period indicator...!!");
    }
    setSelectedPI(null);
  };

  const handleDataGridRowSelectionPI = async ({ selectedRowKeys }) => {
    const length = await selectedRowKeys.length;
    if (selectedRowKeys.length > 1) {
      const value = await dataGridRefPI.current.instance.selectRows(
        selectedRowKeys[length - 1]
      );
      return await setSelectedPI(value);
    } else {
      const value = await dataGridRefPI.current.instance.selectRows(
        selectedRowKeys[0]
      );
      return await setSelectedPI(value);
    }
  };
  // ============================= PERIOD INDICATORE =============================

  // ============================= CREATE PRO =============================
  const columnPRO = [
    // {
    //   caption: "series",
    //   field: "series",
    // },
    {
      caption: "seriesName",
      field: "seriesName",
    },
  ];

  // states
  const [PROPopUp, setPROPopUp] = useState(false);
  const [selectedPRO, setSelectedPRO] = useState(null);
  const [selectedPROSave, setSelectedPROSave] = useState(null);
  const dataGridRefPRO = useRef();

  // handler functions
  const handleCancelPRO = () => {
    setPROPopUp(false);
  };

  const handleSavePRO = async () => {
    console.log("selectedPRO", selectedPRO);
    if (selectedPRO) {
      setPROPopUp(false);
      setSelectedPROSave(selectedPRO);
    } else {
      toastDisplayer("error", "Please select production order...!!");
    }
    setSelectedPRO(null);
  };

  const handleDataGridRowSelectionPRO = async ({ selectedRowKeys }) => {
    console.log("selectedRowKeys", selectedRowKeys);
    return await setSelectedPRO(selectedRowKeys);
  };
  // ============================= CREATE PRO =============================

  // ============================= ISSUE PRO =============================
  const columnIssue = [
    // {
    //   caption: "series",
    //   field: "series",
    // },
    {
      caption: "seriesName",
      field: "seriesName",
    },
  ];

  // const [shift, setShift] = useState([]);
  // const [selectedShiftId, setSelectedShiftId] = useState(null);

  // useEffect(() => {
  //   const fetchShift = async () => {
  //     const response = await getShift();
  //     if (!response.hasError) {
  //       console.log("Shift data from API:", response.responseData);
  //       setShift(response.responseData);
  //     } else {
  //       console.error("Error fetching shift data:", response.errorMessage);
  //     }
  //   };
  //   fetchShift();
  // }, []);

  // states
  const [IssuePopUp, setIssuePopUp] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedIssueSave, setSelectedIssueSave] = useState(null);
  const dataGridRefIssue = useRef();

  // handler functions
  const handleCancelIssue = () => {
    setIssuePopUp(false);
  };

  const handleSaveIssue = async () => {
    console.log(selectedIssue);
    if (selectedIssue) {
      setIssuePopUp(false);
      setSelectedIssueSave(selectedIssue);
    } else {
      toastDisplayer("error", "Please select Issueduction order...!!");
    }
    setSelectedIssue(null);
  };

  const handleDataGridRowSelectionIssue = async ({ selectedRowKeys }) => {
    console.log("selectedRowKeys", selectedRowKeys);
    return await setSelectedIssue(selectedRowKeys);
  };
  // ============================= ISSUE PRO =============================

  // ============================= RECEIPT PRO =============================
  const columnReceipt = [
    // {
    //   caption: "series",
    //   field: "series",
    // },
    {
      caption: "seriesName",
      field: "seriesName",
    },
  ];

  // states
  const [ReceiptPopUp, setReceiptPopUp] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedReceiptSave, setSelectedReceiptSave] = useState(null);
  const dataGridRefReceipt = useRef();

  // handler functions
  const handleCancelReceipt = () => {
    setReceiptPopUp(false);
  };

  const handleSaveReceipt = async () => {
    console.log(selectedReceipt);
    if (selectedReceipt) {
      setReceiptPopUp(false);
      setSelectedReceiptSave(selectedReceipt);
    } else {
      toastDisplayer("error", "Please select Production order...!!");
    }
    setSelectedReceipt(null);
  };

  const handleDataGridRowSelectionReceipt = async ({ selectedRowKeys }) => {
    console.log("selectedRowKeys", selectedRowKeys);
    return await setSelectedReceipt(selectedRowKeys);
  };
  // ============================= Receipt PRO =============================

  // ============================= TRANSFER PRO =============================
  const columnInven = [
    // {
    //   caption: "series",
    //   field: "series",
    // },
    {
      caption: "seriesName",
      field: "seriesName",
    },
  ];

  // states
  const [InvenPopUp, setInvenPopUp] = useState(false);
  const [selectedInven, setSelectedInven] = useState(null);
  const [selectedInvenSave, setSelectedInvenSave] = useState(null);
  const dataGridRefInven = useRef();

  // handler functions
  const handleCancelInven = () => {
    setInvenPopUp(false);
  };

  const handleSaveInven = async () => {
    console.log(selectedInven);
    if (selectedInven) {
      setInvenPopUp(false);
      setSelectedInvenSave(selectedInven);
    } else {
      toastDisplayer("error", "Please select Production order...!!");
    }
    setSelectedInven(null);
  };

  const handleDataGridRowSelectionInven = async ({ selectedRowKeys }) => {
    console.log("selectedRowKeys", selectedRowKeys);
    return await setSelectedInven(selectedRowKeys);
  };
  // ============================= TRANSFER PRO =============================
  const [isLoading, setLoading] = useState(false);

  const saveSeriesRule = async () => {
    if (!selectedUserSave) {
      return toastDisplayer("error", "Select user...!!");
    }
    if (!selectedPISave) {
      return toastDisplayer("error", "Select period indicator...!!");
    }
    // Check the payload before making the API call

    setLoading(true);
    const reqObj = {
      user_ID: selectedUserSave[0].user_ID,
      series_Details: [
        {
          text: "Create",
          seriesList: selectedPROSave ? selectedPROSave.map(String) : [],
        },
        {
          text: "Issue",
          seriesList: selectedIssueSave ? selectedIssueSave.map(String) : [],
        },
        {
          text: "Receipt",
          seriesList: selectedReceiptSave
            ? selectedReceiptSave.map(String)
            : [],
        },
        {
          text: "Transfer",
          seriesList: selectedInvenSave ? selectedInvenSave.map(String) : [],
        },
        // {
        //   text: "Return",
        //   seriesList: [],
        // },
        // {
        //   text: "Close",
        //   seriesList: [],
        // },
        {
          text: "PI",
          seriesList: [selectedPISave],
        },
      ],
      // shift_ID: selectedShiftId,
    };
    console.log("Request payload:", reqObj);
    var response = await saveUserSeries(reqObj);

    if (response.hasError) {
      setLoading(false);
      return toastDisplayer("error", response.errorMessage["statusMsg"]);
    } else {
      setLoading(false);
      navigate("/user-configurations/user-settings");
      return toastDisplayer("success", "Save successfully...!!");
    }
  };

  return (
    <>
      {AuthPopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <AuthHelperPopupPage
              title={"User"}
              caption={"Search the User"}
              handleCancel={handleCancel}
              handleSave={handleSave}
              datagridData={userData}
              keyExpr={"user_ID"}
              columns={column}
              handleDataGridRowSelection={
                handleDataGridRowSelectionAuthRuleUser
              }
              dataGridRef={dataGridRefAuthRule}
              selectedRowKeys={
                selectedUserSave ? [selectedUserSave[0].user_ID] : ""
              }
            />
          )}
        ></Popup>
      )}

      {PeriodPopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <AuthHelperPopupPage
              title={"User"}
              caption={"Search the Period Indicator"}
              handleCancel={handleCancelPI}
              handleSave={handleSavePI}
              datagridData={PIData}
              keyExpr={"indicator"}
              columns={columnPI}
              handleDataGridRowSelection={handleDataGridRowSelectionPI}
              dataGridRef={dataGridRefPI}
              selectedRowKeys={selectedPISave ? [selectedPISave] : ""}
            />
          )}
        ></Popup>
      )}

      {PROPopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <SeriesPopupPage
              title={"Create Production Order"}
              caption={"Search the Production Order"}
              handleCancel={handleCancelPRO}
              handleSave={handleSavePRO}
              datagridData={PROData}
              keyExpr={"series"}
              columns={columnPRO}
              handleDataGridRowSelection={handleDataGridRowSelectionPRO}
              dataGridRef={dataGridRefPRO}
              selectedRowKeys={selectedPROSave ? selectedPROSave : ""}
            />
          )}
        ></Popup>
      )}

      {IssuePopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <SeriesPopupPage
              title={"Create Production Order"}
              caption={"Search the Production Order"}
              handleCancel={handleCancelIssue}
              handleSave={handleSaveIssue}
              datagridData={IssueData}
              keyExpr={"series"}
              columns={columnIssue}
              handleDataGridRowSelection={handleDataGridRowSelectionIssue}
              dataGridRef={dataGridRefIssue}
              selectedRowKeys={selectedIssueSave ? selectedIssueSave : ""}
            />
          )}
        ></Popup>
      )}

      {ReceiptPopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <SeriesPopupPage
              title={"Create Production Order"}
              caption={"Search the Production Order"}
              handleCancel={handleCancelReceipt}
              handleSave={handleSaveReceipt}
              datagridData={ReceiptData}
              keyExpr={"series"}
              columns={columnReceipt}
              handleDataGridRowSelection={handleDataGridRowSelectionReceipt}
              dataGridRef={dataGridRefReceipt}
              selectedRowKeys={selectedReceiptSave ? selectedReceiptSave : ""}
            />
          )}
        ></Popup>
      )}

      {InvenPopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <SeriesPopupPage
              title={"Create Production Order"}
              caption={"Search the Production Order"}
              handleCancel={handleCancelInven}
              handleSave={handleSaveInven}
              datagridData={InvenData}
              keyExpr={"series"}
              columns={columnInven}
              handleDataGridRowSelection={handleDataGridRowSelectionInven}
              dataGridRef={dataGridRefInven}
              selectedRowKeys={selectedInvenSave ? selectedInvenSave : ""}
            />
          )}
        ></Popup>
      )}

      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"User Settings"} />
          </div>
          <div
            className="buttons-section"
            style={{
              display: "flex",
              // justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button text="Cancel" width={124} height={44} />
            <Button
              text="Save"
              type="default"
              width={124}
              height={44}
              onClick={saveSeriesRule}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div>
          <TextBox
            label="User ID"
            placeholder="Input"
            height={56}
            width={320}
            value={selectedUserSave ? selectedUserSave[0].user_Name : ""}
          >
            <TextBoxButton
              name="popupSearch"
              location="after"
              options={userHelpOptions}
              height={44}
              width={44}
              className="popup-icon"
            />
          </TextBox>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="expandable-text" onClick={handleToggleExpand}>
          Period Indicator
          {isExpanded ? (
            <Button icon="chevronup" />
          ) : (
            <Button icon="chevrondown" />
          )}
        </div>
        {isExpanded && (
          <div style={{ marginTop: "32px" }}>
            <TextBox
              placeholder="Period Indicator"
              height={44}
              value={selectedPISave ? selectedPISave : ""}
              width={320}
            >
              <TextBoxButton
                name="popupSearch"
                location="after"
                options={PeriodIndicatorOptions}
                height={44}
                width={44}
                className="popup-icon"
              />
            </TextBox>
          </div>
        )}
      </div>

      <div className="content-block dx-card responsive-paddings">
        <div className="expandable-text" onClick={handleToggleExpandSeries}>
          Series{" "}
          {isExpandedSeries ? (
            <Button icon="chevronup" />
          ) : (
            <Button icon="chevrondown" />
          )}
        </div>
        {isExpandedSeries && (
          <>
            <div className="transfer-inputs-main" style={{ marginTop: "32px" }}>
              <TextBox placeholder="Create PRO Series" height={44}>
                <TextBoxButton
                  name="popupSearch"
                  location="after"
                  options={CreateProOptions}
                  className="popup-icon"
                />
              </TextBox>
              <TextBox placeholder="Issue PRO Series" height={44}>
                <TextBoxButton
                  name="popupSearch"
                  location="after"
                  options={IssueOptions}
                  className="popup-icon"
                />
              </TextBox>
              <TextBox placeholder="Receipt PRO Series" height={44}>
                <TextBoxButton
                  name="popupSearch"
                  location="after"
                  options={ReceiptOptions}
                  className="popup-icon"
                />
              </TextBox>
              <TextBox placeholder="Transfer Series" height={44}>
                <TextBoxButton
                  name="popupSearch"
                  location="after"
                  options={TransferOptions}
                  className="popup-icon"
                />
              </TextBox>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default UserSettingMain;
