import React, { useEffect } from "react";
import TablefixHeader from "../src/components/tablefixHeader";
import { clearUsersList, getUsersList } from "../src/actions/usersAction";
import firebase from "../src/config/firebase";
import { connect } from "react-redux";
import BottomNav from "../src/layouts/bottomNav";
import AlertDialogSlide from "../src/components/alertDialog";
import DeleteAlert from "../src/components/deleteAlert";
import EditDialog from "../src/components/editDialog";

const mapStateToProps = (state) => {
  return {
    getUsersList: state.users.getUsersList,
  };
};

const Index = (props) => {
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
      },
    },
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
    {
      name: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <AlertDialogSlide idUser={props.getUsersList[dataIndex].id} />
              <EditDialog idUser={props.getUsersList[dataIndex].id} />
              <DeleteAlert idUser={props.getUsersList[dataIndex].id} />
            </>
          );
        },
      },
    },
  ];

  useEffect(() => {
    if (!props.getUsersList) {
      firebase
        .database()
        .ref("/users")
        .on("value", (snapshot) => {
          props.dispatch(clearUsersList());
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
