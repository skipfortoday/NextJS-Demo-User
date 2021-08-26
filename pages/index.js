import React, { useEffect } from "react";
import BottomNav from "../src/layouts/bottomNav";
import RestStatus from "../src/components/restStatus";
import Config from "../src/config";

const Index = () => {
  console.log(`"${Config.ipJK1}"`);
  return (
    <>
      <RestStatus />
    </>
  );
};
Index.layout = BottomNav;
export default Index;
