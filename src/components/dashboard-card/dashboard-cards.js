import React, { useState, useEffect } from "react";
import { SVG1, SVG2, SVG3, SVG4 } from "../../assets";
// import { getDashboardCardData } from "../../api/create-pro.api";
import Card from "../card/card";

const DashboardCards = ({ parameter1, parameter2 }) => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getDashboardData = async () => {
  //     setLoading(true);
  //     const response = await getDashboardCardData(parameter1, parameter2);
  //     if (!response.hasError) {
  //       setLoading(false);
  //       setDashboardData(response.responseData);
  //     }
  //   };
  //   getDashboardData();
  // }, [parameter1, parameter2]);

  return (
    <div className="content-block dx-card responsive-paddings">
      <div className="navigation-card-create-pro">
        <Card
          // text={dashboardData.total}
          text={20}
          subtext="Weekly PRO"
          imageSrc={SVG1}
          visible={true}
        />
        <Card
          // text={dashboardData.pending}
          text={20}
          subtext="WEEKLY Pending PRO"
          imageSrc={SVG2}
          visible={true}
        />
        <Card
          // text={dashboardData.approved}
          text={20}
          subtext="WEEKLY Verified PRO"
          imageSrc={SVG3}
          visible={true}
        />
        <Card
          // text={dashboardData.rejected}
          text={20}
          subtext="WEEKLY Rejected PRO"
          imageSrc={SVG4}
          visible={true}
        />
      </div>
    </div>
  );
};

export default DashboardCards;
