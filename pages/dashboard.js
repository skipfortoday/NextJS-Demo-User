import React, { useEffect } from "react";
import BottomNav from "../src/layouts/bottomNav";
import CommingSoon from "../src/components/commingsoon";

const Dashboard = () => {
  return (
    <>
      <CommingSoon />
    </>
  );
};
Dashboard.layout = BottomNav;
export default Dashboard;
