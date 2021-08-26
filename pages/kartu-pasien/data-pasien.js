import React, { useEffect } from "react";
import BottomNav from "../../src/layouts/bottomNav";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getDataPasien } from "../../src/actions/kartu-pasien-action";
import firebase from "../../src/config/firebase";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    getDataPasien: state.kartuPasien.getDataPasien,
  };
};

const columns = [
  {
    name: "NKP",
    options: {
      filter: false,
    },
  },
  {
    name: "Flag",
    options: {
      filter: false,
    },
  },
  {
    name: "Waktu",
    options: {
      filter: false,
    },
  },
];

const dataPasien = (props) => {
  useEffect(() => {
    if (!props.getDataPasien) {
      props.dispatch(getDataPasien());
      firebase
        .database()
        .ref("/kartu-pasien/tblDataPasien")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          props.dispatch(getDataPasien());
        });
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getDataPasien}
        title="Kartu Pasien Table Data Pasien"
        columns={columns}
      />
    </>
  );
};

dataPasien.layout = BottomNav;
export default connect(mapStateToProps, null)(dataPasien);
