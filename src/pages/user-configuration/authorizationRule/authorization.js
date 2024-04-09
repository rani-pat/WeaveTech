import React, { useState, useRef, useEffect, useCallback } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { navigation } from "../../../app-navigation";
import {
  HeaderText,
  SubText,
} from "../../../components/typographyText/TypograghyText";
import { Button as NormalButton, Popup, TextBox } from "devextreme-react";
import AuthHelperPopupPage from "./auth_helper_popup";
import TreeList, { Column, SearchPanel } from "devextreme-react/tree-list";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { PopupIcon } from "../../../assets";
import { Toolbar, Item } from "devextreme-react/data-grid";
import { toastDisplayer } from "../../../components/toastDisplayer/toastdisplayer";
import CheckBox from "devextreme-react/check-box";
import {
  getUserAuthRole,
  getUserData,
  postAuthenticationRule,
} from "../../../api/userConfiguration";
import "./authorize.scss";
// import Triangleloader from "../../../components/loader/Loader";

function UserAuthorization() {
  const fakeData = [
    {
      Task_ID: 1,
      Task_Subject: "Production",
      Task_Parent_ID: 0,
    },
    {
      Task_ID: 11,
      Task_Subject: "Create PRO",
      Task_Parent_ID: 1,
    },
    {
      Task_ID: 12,
      Task_Subject: "Verify PRO",
      Task_Parent_ID: 1,
    },
    {
      Task_ID: 13,
      Task_Subject: "Issue PRO",
      Task_Parent_ID: 1,
    },
    {
      Task_ID: 14,
      Task_Subject: "Verify Issue",
      Task_Parent_ID: 1,
    },
    {
      Task_ID: 15,
      Task_Subject: "Receipt PRO",
      Task_Parent_ID: 1,
    },
    {
      Task_ID: 16,
      Task_Subject: "Verify Receipt",
      Task_Parent_ID: 1,
    },
    {
      Task_ID: 17,
      Task_Subject: "Return Items",
      Task_Parent_ID: 1,
    },
    {
      Task_ID: 18,
      Task_Subject: "Close PRO",
      Task_Parent_ID: 1,
    },
    {
      Task_ID: 2,
      Task_Subject: "Inventory Transfer",
      Task_Parent_ID: 0,
    },
    {
      Task_ID: 21,
      Task_Subject: "Transfer",
      Task_Parent_ID: 2,
    },
    {
      Task_ID: 22,
      Task_Subject: "Verify Transfer",
      Task_Parent_ID: 2,
    },
    {
      Task_ID: 3,
      Task_Subject: "Reports",
      Task_Parent_ID: 0,
    },
    {
      Task_ID: 31,
      Task_Subject: "Total PRO Listing",
      Task_Parent_ID: 3,
    },
    {
      Task_ID: 32,
      Task_Subject: "Issued PRO Listing",
      Task_Parent_ID: 3,
    },
    {
      Task_ID: 33,
      Task_Subject: "Receipt PRO Listing",
      Task_Parent_ID: 3,
    },
    {
      Task_ID: 34,
      Task_Subject: "Inventory Transfer PRO Listing",
      Task_Parent_ID: 3,
    },
    {
      Task_ID: 35,
      Task_Subject: "Closed PRO Listing",
      Task_Parent_ID: 3,
    },
  ];
  const navigation_main = [
    {
      text: "Production",
      icon: "details",
      path: "/production",
      hasAccess: true,
      items: [
        {
          text: "Create PRO",
          path: "/production/create-pro",
          icon: "add",
          hasAccess: true,
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Verify PRO",
          path: "/production/verify-pro-listing",
          icon: "rule",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Issue PRO",
          path: "/production/issue-pro",
          icon: "move_item",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Verify Issue",
          path: "/production/verify-issue-pro-listing",
          icon: "rule",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Receipt PRO",
          path: "/production/receipt-pro",
          icon: "call_received",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Verify Receipt",
          path: "/production/verify-receipt",
          icon: "rule",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Return Items",
          path: "/production/return-items",
          icon: "keyboard_tab_rtl",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Close PRO",
          path: "/production/close-pro",
          icon: "remove_road",
          rightsAccess: ["F", "F", "F", "F"],
        },
      ],
    },
    {
      text: "Inventory Transfer",
      icon: "inventory_2",
      path: "/transfer",
      hasAccess: true,
      items: [
        {
          text: "Transfer",
          path: "/transfer/inventory-transfer",
          icon: `move_up`,
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Verify Transfer",
          path: "/transfer/verify-transfer",
          icon: "rule",
          rightsAccess: ["F", "F", "F", "F"],
        },
      ],
    },
    {
      text: "Reports",
      path: "/reports",
      icon: `monitoring`,
      hasAccess: true,
      items: [
        {
          text: "Total PRO Listing",
          path: "/reports/Total-PRO-Listing",
          icon: `move_up`,
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Issued PRO Listing",
          path: "/reports/Issued-PRO-Listing",
          icon: "rule",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Receipt PRO Listing",
          path: "/reports/Receipt-PRO-Listing",
          icon: "rule",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Inventory Transfer PRO Listing",
          path: "/reports/Inventory-Transfer-PRO-Listing",
          icon: "rule",
          rightsAccess: ["F", "F", "F", "F"],
        },
        {
          text: "Closed PRO Listing",
          path: "/reports/Closed-PRO-Listing",
          icon: "rule",
          rightsAccess: ["F", "F", "F", "F"],
        },
      ],
    },
  ];

  const [isModuleTreeVisible, setModuleTreeVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const expandedKeys = []; // Main row initially expanded
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [AuthPopUp, setAuthPopUp] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysOnChangeAuth, setSelectedRowKeysOnChangeAuth] =
    useState([]);
  const [selectedCopyRowKeysOnChangeAuth, setSelectedCopyRowKeysOnChangeAuth] =
    useState([]);
  const [CopyAuthPopUp, CopysetAuthPopUp] = useState(false);
  const [disableCopyText, setdisableCopyText] = useState(true);
  const [userData, setUserData] = useState([]);
  const [userCopyData, setUserCopyData] = useState([]);
  const [selectedCopyRowKeys, setSelectedCopyRowKeys] = useState([]);
  const [userAuthorizationRule, setuserAuthorizationRule] = useState([]);
  const dataGridRefAuthRule = useRef();
  const dataGridCopyRefAuthRule = useRef();
  const updatedStates = {};
  useEffect(() => {
    if (userAuthorizationRule) {
      findTaskIDWithAccess(userAuthorizationRule, fakeData);
    } else {
      fakeData.forEach((task) => {
        updatedStates[task.Task_ID] = {
          C: false,
          R: false,
          U: false,
          D: false,
        };
      });
      setCheckboxStates(updatedStates);
    }
  }, []);

  const handleCheckboxValueChanged = useCallback(
    (taskId, action, value) => {
      setCheckboxStates((prevCheckboxStates) => ({
        ...prevCheckboxStates,
        [taskId]: {
          ...prevCheckboxStates[taskId],
          [action]: value,
        },
      }));
    },
    [setCheckboxStates]
  );

  const helpOptions = {
    icon: PopupIcon,
    onClick: async () => {
      showPopupHandler();
    },
  };
  const copyhelpOptions = {
    icon: PopupIcon,
    onClick: async () => {
      copyshowPopupHandler();
    },
  };
  const copyshowPopupHandler = () => {
    CopysetAuthPopUp(true);
  };

  const showPopupHandler = () => {
    setAuthPopUp(true);
  };
  const handleCancel = () => {
    setAuthPopUp(false);
  };
  const handleCopyPopupCancel = () => {
    CopysetAuthPopUp(false);
  };
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
  const copyToPopUpData = (id) => {
    const new_data = userData.filter((user) => user.user_ID !== id);
    setUserCopyData(new_data);
  };
  function findTaskIDWithAccess(object, data) {
    setCheckboxStates(updatedStates);
    object.map((item) => {
      // if (item.hasAccess) {
      item.items.map((entry) => {
        const taskID = data.find(
          (sub_entry) =>
            sub_entry.Task_Subject.toLowerCase() === entry.text.toLowerCase()
        )?.Task_ID;
        setCheckboxStates((prevStates) => ({
          ...prevStates,
          [taskID]: {
            ...prevStates[taskID],
            C: entry.rightsAccess[0] === "T" ? true : false,
            R: entry.rightsAccess[1] === "T" ? true : false,
            U: entry.rightsAccess[2] === "T" ? true : false,
            D: entry.rightsAccess[3] === "T" ? true : false,
          },
        }));
        // console.log(checkboxStates);
      });
      // }
    });
  }
  const handleDataGridCopyRowSelectionAuthRuleUser = async ({
    selectedRowKeys,
  }) => {
    setSelectedCopyRowKeysOnChangeAuth(selectedRowKeys);
  };

  const handleAuthData = async () => {
    if (selectedRowKeysOnChangeAuth.length > 0) {
      setLoading(true);
      const finalNavigation = navigation_main.map((item) => {
        const childRights = item.items.map((subItem) => {
          const taskId = fakeData.find(
            (task) => task.Task_Subject === subItem.text
          )?.Task_ID;
          return {
            text: subItem.text,
            path: subItem.path,
            icon: subItem.icon,
            rightsAccess: [
              checkboxStates[taskId]?.C ? "T" : "F",
              checkboxStates[taskId]?.R ? "T" : "F",
              checkboxStates[taskId]?.U ? "T" : "F",
              checkboxStates[taskId]?.D ? "T" : "F",
            ],
          };
        });

        const parentHasAccess = childRights.some((child) =>
          child.rightsAccess.includes("T")
        );

        return {
          text: item.text,
          path: item.path,
          icon: item.icon,
          hasAccess: parentHasAccess,
          items: childRights,
        };
      });

      const payload = {
        User_ID: selectedRowKeysOnChangeAuth[0].user_ID,
        moduleCLasses: finalNavigation,
      };
      const apiResponse = await postAuthenticationRule(payload);
      if (apiResponse.hasError) {
        return toastDisplayer("error", apiResponse.errorMessage);
      } else {
        setSelectedRowKeysOnChangeAuth([]);
        setModuleTreeVisible(false);
        setLoading(false);
        return toastDisplayer("success", apiResponse.responseData.statusMsg);
      }
    } else {
      setLoading(false);
      return toastDisplayer("error", "Please select a user");
    }
  };

  const handleDataGridRowSelectionAuthRuleUser = async ({
    selectedRowKeys,
  }) => {
    setSelectedRowKeysOnChangeAuth(selectedRowKeys);
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
  const selectedRowSetterApprove = async (params) => {
    setSelectedRowKeysOnChangeAuth(params);
  };
  useEffect(() => {
    const userDataFetch = async () => {
      setLoading(true);
      const allDataList = await getUserData();
      if (allDataList && !allDataList.hasError) {
        setLoading(false);
        var resData = allDataList.responseData;
        resData = resData.filter((item) => item.user_ID !== 5);
        setUserData(resData);
      }
    };
    userDataFetch();
  }, []);

  const handleSave = async () => {
    setSelectedRowKeys(selectedRowKeysOnChangeAuth);
    if (selectedRowKeysOnChangeAuth.length > 0) {
      setAuthPopUp(false);
      copyToPopUpData(selectedRowKeysOnChangeAuth[0].user_ID);
      const reqData = {
        User_ID: selectedRowKeysOnChangeAuth[0].user_ID,
      };
      const getUserAuthRoleRes = await getUserAuthRole(reqData);
      if (!getUserAuthRoleRes.hasError) {
        findTaskIDWithAccess(
          getUserAuthRoleRes.responseData.authentication_Rule,
          fakeData
        );
        setuserAuthorizationRule(
          getUserAuthRoleRes.responseData.authentication_Rule
        );
        setdisableCopyText(false);
      } else {
        // setdisableCopyText(true);
        fakeData.forEach((task) => {
          updatedStates[task.Task_ID] = {
            C: false,
            R: false,
            U: false,
            D: false,
          };
        });
        setCheckboxStates(updatedStates);
      }
      setModuleTreeVisible(true);
    } else {
      return toastDisplayer("error", "Please select a user");
    }
  };
  const handleCopySave = async () => {
    const res = [];
    await Promise.all(
      selectedCopyRowKeysOnChangeAuth.map(async (element) => {
        const payload = {
          User_ID: element,
          moduleCLasses: userAuthorizationRule,
        };
        console.log("PayLoad : ", payload);
        const apiResponse = await postAuthenticationRule(payload);
        res.push(apiResponse);
      })
    );
    console.log(res);

    if (res.length > 0) {
      if (res.some((item) => item.hasError)) {
        res.forEach((item) => {
          if (item.hasError) {
            toastDisplayer("error", item.errorMessage);
          }
        });
      } else {
        toastDisplayer("success", "Copy rule successfully...!!");
      }
      CopysetAuthPopUp(false);
    } else {
      CopysetAuthPopUp(false);
      return toastDisplayer("error", "Something went wrong");
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
              // apiCallFun={getUserData()}
              datagridData={userData}
              keyExpr={"user_ID"}
              columns={column}
              handleDataGridRowSelection={
                handleDataGridRowSelectionAuthRuleUser
              }
              dataGridRef={dataGridRefAuthRule}
              selectedRowKeys={selectedRowKeys}
            />
          )}
        ></Popup>
      )}
      {CopyAuthPopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <AuthHelperPopupPage
              title={"Copy Authorization Rule to Users"}
              caption={"Search the User"}
              handleCancel={handleCopyPopupCancel}
              handleSave={handleCopySave}
              datagridData={userCopyData}
              keyExpr={"user_ID"}
              columns={column}
              handleDataGridRowSelection={
                handleDataGridCopyRowSelectionAuthRuleUser
              }
              dataGridRef={dataGridCopyRefAuthRule}
              selectedRowKeys={selectedCopyRowKeys}
            />
          )}
        ></Popup>
      )}
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro-auth">
          <div className="title-section">
            <HeaderText text={"Authorisation "} />
          </div>
          <div className="title-section-btn">
            <NormalButton
              text="Authorise"
              height={44}
              width={144}
              type="default"
              disabled={!isModuleTreeVisible}
              onClick={handleAuthData}
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <TextBox
            value={
              selectedRowKeysOnChangeAuth.length > 0
                ? selectedRowKeysOnChangeAuth[0].user_Name
                : ""
            }
            label="User ID"
            placeholder="Select User"
            height={56}
            width={300}
          >
            <TextBoxButton
              name="popupSearch"
              location="after"
              options={helpOptions}
              height={44}
              width={44}
              className="popup-icon"
            />
          </TextBox>
        </div>
      </div>
      {isModuleTreeVisible && (
        <div className="content-block dx-card ">
          <div className="navigation-header-create-pro">
            {/* {loading ? (
              <Triangleloader />
            ) : ( */}
            <>
              <TreeList
                dataSource={fakeData}
                keyExpr="Task_ID"
                parentIdExpr="Task_Parent_ID"
                defaultExpandedRowKeys={expandedKeys}
                defaultSelectedRowKeys={selectedKeys}
                showRowLines={true}
                showColumnLines={false}
                columnAutoWidth={false}
                className="tree-list-main"
              >
                <SearchPanel visible={true} />
                <Column
                  dataField="Task_Subject"
                  caption="Modules"
                  // width={300}
                />
                <Column dataField="Task_ID" visible={false} />
                <Column
                  caption="Create"
                  alignment={"center"}
                  cellRender={(cellData) => {
                    const isSubRow = cellData.data.Task_Parent_ID !== 0;
                    if (isSubRow) {
                      return (
                        <>
                          <CheckBox
                            value={checkboxStates[cellData.data.Task_ID]?.C}
                            onValueChanged={(e) => {
                              handleCheckboxValueChanged(
                                cellData.data.Task_ID,
                                "C",
                                e.value
                              );
                            }}
                          />
                        </>
                      );
                    }
                    return null;
                  }}
                />
                <Toolbar>
                  <Item location="before">
                    <div className="informer">
                      <SubText text={"All the Modules"} />
                    </div>
                  </Item>
                  <Item name="searchPanel" />
                  <Item location="after">
                    <TextBox
                      placeholder="Pre-set Rule"
                      // width={168}
                      className="report-right"
                    >
                      <TextBoxButton
                        name="popupSearch"
                        location="after"
                        options={copyhelpOptions}
                        height={44}
                        className="popup-icon"
                      />
                    </TextBox>
                  </Item>
                </Toolbar>
              </TreeList>
            </>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
}

export default UserAuthorization;
