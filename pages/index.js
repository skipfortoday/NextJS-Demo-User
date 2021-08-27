import React, { useEffect } from "react";
import TablefixHeader from "../src/components/tablefixHeader";
import { getUsersList } from "../src/actions/usersAction";
import firebase from "../src/config/firebase";
import { connect } from "react-redux";
import BottomNav from "../src/layouts/bottomNav";

const mapStateToProps = (state) => {
  return {
    getUsersList: state.users.getUsersList,
  };
};

const columns = [
  {
    name: "name",
    label: "Nama",
    options: {
      filter: false,
    },
  },
  {
    name: "jobTitle",
    label: "Profesi",
    options: {
      filter: false,
    },
  },
];

const Index = (props) => {
  useEffect(() => {
    if (!props.getUsersList) {
      firebase
        .database()
        .ref("/users")
        .on("value", (snapshot) => {
          props.dispatch(getUsersList());
        });
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getUsersList}
        title="Users List"
        columns={columns}
      />
    </>
  );
};

Index.layout = BottomNav;
export default connect(mapStateToProps, null)(Index);
