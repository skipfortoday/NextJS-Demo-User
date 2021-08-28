import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import {
  deleteUser,
  getUserDetail,
  clearUsersDetail,
} from "../actions/usersAction";

const mapStateToProps = (state) => {
  return {
    deleteUser: state.users.deleteUser,
    getUserDetail: state.users.getUserDetail,
  };
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteAlert = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    props.dispatch(getUserDetail(props.idUser));
  };

  const handleClose = () => {
    props.dispatch(clearUsersDetail());
    setOpen(false);
  };

  const handleDelete = () => {
    props.dispatch(deleteUser(props.idUser));
    props.dispatch(clearUsersDetail());
    setOpen(false);
  };
  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`Delete Alert`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6" component="h2">
              Yakin Delete {props.getUserDetail?.name} ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect(mapStateToProps, null)(DeleteAlert);
