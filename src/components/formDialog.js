import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, StylesProvider } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { postUserAdd } from "../actions/usersAction";
import firebase from "../config/firebase";
import SelectInput from "@material-ui/core/Select/SelectInput";

const mapStateToProps = (state) => {
  return {
    postUserAdd: state.users.postUserAdd,
    getUsersList: state.users.getUsersList,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const FormDialog = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [validID, setValidID] = React.useState(null);
  //   const classes = useStyles();
  const { reset, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    props.dispatch(postUserAdd(data));
    setOpen(false);
  };

  const validateID = async (value) => {
    firebase
      .database()
      .ref("users")
      .orderByChild("id")
      .equalTo(value)
      .on("value", function (snapshot) {
        let idkey = snapshot.val();
        setValidID(idkey);
      });
    if (validID != null) return "Hmm ID sudah digunakan";
    return true;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseX = () => {
    reset();
    setOpen(false);
    setValidID(null);
  };

  return (
    <>
      <Tooltip title="Tambah User">
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleCloseX}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="id"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="User ID"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "User ID required", validate: validateID }}
            />
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Nama"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Nama required" }}
            />
            <Controller
              name="age"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Umur"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="number"
                />
              )}
              rules={{
                required: "Umur required",
                min: {
                  value: 1,
                  message: "Mauskan umur yang valid",
                },
              }}
            />
            <Controller
              name="location"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Lokasi"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Lokasi required" }}
            />
            <Controller
              name="jobTitle"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Profesi"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Profesi required" }}
            />
            <Controller
              name="desc"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Deskripsi"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Deskripsi required" }}
            />
            <div>
              <Button variant="contained" onClick={handleCloseX}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Signup
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default connect(mapStateToProps, null)(FormDialog);
