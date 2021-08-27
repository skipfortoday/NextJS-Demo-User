import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import InfoIcon from "@material-ui/icons/Info";
import { IconButton, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { clearUsersDetail, getUserDetail } from "../actions/usersAction";

const mapStateToProps = (state) => {
  return {
    getUsersDetail: state.users.getUserDetail,
  };
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    props.dispatch(getUserDetail(props.idUser));
  };

  const handleClose = () => {
    props.dispatch(clearUsersDetail());
    setOpen(false);
  };
  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`${props.getUsersDetail?.name} Detail Info`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6" component="h2">
              Nama : {props.getUsersDetail?.name}
            </Typography>
            <Typography variant="h6" component="h2">
              User ID : {props.getUsersDetail?.id}
            </Typography>
            <Typography variant="h6" component="h2">
              Umur : {props.getUsersDetail?.age}
            </Typography>
            <Typography variant="h6" component="h2">
              Kota : {props.getUsersDetail?.location}
            </Typography>
            <Typography variant="h6" component="h2">
              Profesi : {props.getUsersDetail?.jobTitle}
            </Typography>
            <Typography variant="h6" component="h2">
              Deskripsi :{props.getUsersDetail?.desc}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect(mapStateToProps, null)(AlertDialogSlide);
