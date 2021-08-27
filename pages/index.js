import React, { useEffect } from "react";
import TablefixHeader from "../src/components/tablefixHeader";
import {
  clearUsersList,
  deleteUser,
  getUsersList,
} from "../src/actions/usersAction";
import firebase from "../src/config/firebase";
import { connect } from "react-redux";
import BottomNav from "../src/layouts/bottomNav";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import AlertDialogSlide from "../src/components/alertDialog";

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
              <IconButton size="small" onClick={() => console.log("")}>
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() =>
                  props.dispatch(deleteUser(props.getUsersList[dataIndex].id))
                }
              >
                <DeleteIcon />
              </IconButton>
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
