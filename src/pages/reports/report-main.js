import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";
import {
  HeaderText,
  PopupHeaderText,
} from "../../components/typographyText/TypograghyText";
import Card from "../../components/card/card";
import { navigation } from "../../app-navigation";
import { Button, TextBox } from "devextreme-react";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import "./report.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import reports from "./report-list";
// import { getReportTotalWeeklyData } from "../../api/report.api";

const ReportMain = () => {
  const [searchText, setSearchText] = useState("");
  const [dashboardData, setAllDashboardData] = useState([]);
  const handleSearchChange = (e) => {
    // console.log("e", e.value);
    setSearchText(e.value ? e.value.toLowerCase() : "");
    setSearchText(e.value);
  };
  const navigate = useNavigate();

  const formatItemName = (name) => {
    if (!searchText || searchText.trim() === "") {
      return name;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    let highlightedName = name;

    const regex = new RegExp(lowerCaseSearchText, "gi");

    highlightedName = highlightedName.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );

    // console.log("e", highlightedName);
    return highlightedName;
  };
  useEffect(() => {
    formatItemName(searchText);
  }, [searchText]);

  const handleClick = (link) => {
    console.log("link", link);
    navigate(link);
  };

  const itemList = [
    { text: "Total Production Order", link: "/reports/Total-PRO-Listing" },
    { text: "Issued Pro’s", link: "/reports/Issued-PRO-Listing" },
    { text: "Receipt Pro’s", link: "/reports/Receipt-PRO-Listing" },
    { text: "Closed Pro’s ", link: "/reports/Closed-PRO-Listing" },
    {
      text: "Inventory Transfer",
      link: "/reports/Inventory-Transfer-PRO-Listing",
    },
  ];

  const { AuthRuleContect } = useAuth();
  const [allowdReport, setAllowdReport] = useState([]);
  useEffect(() => {
    // console.log("AuthRuleContect : ", AuthRuleContect);
    // const data = AuthRuleContect.filter((element) => {
    //   if (element.text == "Reports") {
    //     return element;
    //   }
    // });
    // const data1 = data[0].items;
    // // console.log("data1 : ", data1);
    // const data2 = data1.map((element) => element.text);
    // console.log("data2 : ", data2);
    // console.log("reports : ", reports);
    // const filterText = reports.filter((item)=>{
    // })
    // const filteredArray = reports
    //   .map((category) => {
    //     return {
    //       ...category,
    //       item: category.items.filter((item) => data2.includes(item.id)),
    //     };
    //   })
    //   .filter((category) => category.item.length > 0);
    // if (filteredArray.length > 0) {
    //   setAllowdReport(filteredArray[0].item);
    // }
    // const reportTexts = reports.map((report) => report.name);
    // console.log("reportTexts : ",reportTexts);
    // // Filter the data array based on the presence of the texts in the reports array
    // const filteredData = AuthRuleContect.filter((item) => reportTexts.includes(item.text));
    // console.log(filteredData);
  }, []);

  // ------------ dashboard --------------------//
  // useEffect(() => {
  //   const getDashboardData = async () => {
  //     const response = await getReportTotalWeeklyData();
  //     if (!response.hasError) {
  //       setAllDashboardData(response.responseData);
  //     }
  //   };
  //   getDashboardData();
  // }, []);

  return (
    <>
      <Breadcrumbs navigation={navigation} />
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <HeaderText text={"Reports"} />
          </div>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-card-create-pro">
          <Card
            // text={dashboardData.productionOrder}
            subtext="Weekly Payment's"
            text={30}
          />
          <Card
            // text={dashboardData.productionIssue}
            text={25}
            subtext="Weekly Issued Payment "
          />
          <Card
            text={40}
            // text={dashboardData.productionReceipt}
            subtext="Weekly RECEIPT payment"
          />
          <Card
            // text={dashboardData.closedProduction}
            text={20}
            subtext="Weekly CLOSE payment"
          />
          <Card
            // text={dashboardData.inventoryTransfer}
            text={10}
            subtext="Weekly transfer Payment"
          />
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings">
        <div className="navigation-header-create-pro">
          <div className="title-section">
            <PopupHeaderText text={"All Modules"} />
          </div>
          <div className="title-section-btn">
            <div className="search-section">
              <div className="box" title={"Search"}>
                <i className="dx-icon dx-icon-search"></i>
                <TextBox
                  // className="dx-field-value custom-search-box"
                  stylingMode="outlined"
                  placeholder="Search modules..."
                  height={40}
                  width={320}
                  displayExpr={(item) => item}
                  searchExpr="name"
                  showClearButton={true}
                  onValueChanged={handleSearchChange}
                  valueChangeEvent="keyup"
                />
                {/* <div className="box-label" style={{ maxWidth: "100px" }}>
                  Search
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-block dx-card responsive-paddings ">
        <>
          {itemList.map((item, index) => (
            <button
              key={index}
              className="report-link report-button"
              onClick={() => handleClick(item.path)}
            >
              <span
                dangerouslySetInnerHTML={{ __html: formatItemName(item.text) }}
              />
              <span className="report-icon">
                <ArrowOutwardOutlinedIcon />
              </span>
            </button>
          ))}
        </>
      </div>
    </>
  );
};
export default ReportMain;
