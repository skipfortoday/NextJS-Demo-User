import React, { useEffect } from "react";
import BottomNav from "../../src/layouts/bottomNav";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getDokter } from "../../src/actions/kartu-pasien-action";
import { connect } from "react-redux";
import firebase from "../../src/config/firebase";

const mapStateToProps = (state) => {
  return {
    getDokter: state.kartuPasien.getDokter,
  };
};

const columns = [
  {
    name: "IDDokter",
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

const Dokter = (props) => {
  useEffect(() => {
    if (!props.getDokter) {
      props.dispatch(getDokter());
      firebase
        .database()
        .ref("/kartu-pasien/tblDokter")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          props.dispatch(getDokter());
        });
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getDokter}
        title="Kartu Pasien Table Dokter"
        columns={columns}
      />
    </>
  );
};

Dokter.layout = BottomNav;
export default connect(mapStateToProps, null)(Dokter);
