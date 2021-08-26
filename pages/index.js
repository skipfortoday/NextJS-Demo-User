import React, { useEffect } from "react";
import TablefixHeader from "../src/components/tablefixHeader";
import { getBA } from "../src/actions/kartu-pasien-action";
import firebase from "../src/config/firebase";
import { connect } from "react-redux";
import BottomNav from "../src/layouts/bottomNav";

const Index = () => {
  return {
    getUsersList: state.users.getUsersList,
  };
};

const columns = [
  {
    name: "ID",
    options: {
      filter: false,
    },
  },
  {
    name: "Nama",
    options: {
      filter: false,
    },
  },
  {
    name: "Profesi",
    options: {
      filter: false,
    },
  },
];

const Index = (props) => {
  useEffect(() => {
    if (!props.getgetUsersListBA) {
      props.dispatch(getUsersListtBA());
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
      <TablefixHeader data={props.getBA} title="Users List" columns={columns} />
    </>
  );
};

Index.layout = BottomNav;
export default connect(mapStateToProps, null)(Index);
