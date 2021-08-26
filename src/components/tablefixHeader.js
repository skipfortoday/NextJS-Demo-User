import React from "react";
import MUIDataTable from "mui-datatables";
import Skeleton from "@material-ui/lab/Skeleton";
import CustomToolbarSelect from "./customToolbarSelect";
import Slide from "@material-ui/core/Slide";

const TablefixHeader = (props) => {
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: "400px",
    customToolbarSelect: (selectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} />
    ),
  };
  const data = props.data ? props.data : [];
  return props.data ? (
    <>
      <Slide in="true" direction="up">
        <MUIDataTable
          title={props.title}
          data={data}
          columns={props.columns}
          options={options}
        />
      </Slide>
    </>
  ) : (
    <>
      <Skeleton variant="text" height={100} animation={"wave"} />
      <Skeleton variant="rect" height={420} animation={"wave"} />
    </>
  );
};

export default TablefixHeader;
