import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import {
  putUserEdit,
  getUserDetail,
  clearUsersDetail,
} from "../actions/usersAction";

const mapStateToProps = (state) => {
  return {
    putUserEdit: state.users.putUserEdit,
    getUserDetail: state.users.getUserDetail,
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

const EditDialog = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { reset, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: "",
      jobTitle: "",
      desc: "",
      location: "",
      age: "",
    },
  });

  useEffect(() => {
    setValue("name", props.getUserDetail.name);
    setValue("jobTitle", props.getUserDetail.jobTitle);
    setValue("desc", props.getUserDetail.desc);
    setValue("location", props.getUserDetail.location);
    setValue("age", props.getUserDetail.age);
  });

  const onSubmit = (data) => {
    props.dispatch(putUserEdit(data, props.idUser));
    setOpen(false);
  };

  const handleClickOpen = () => {
    props.dispatch(getUserDetail(props.idUser));
    setOpen(true);
  };

  // useEffect(() => {
  //   if (props.getUserDetail) {
  //     setValue([
  //       { name: props.getUserDetail?.name },
  //       { age: props.getUserDetail?.age },
  //     ]);
  //   }
  // }, [props.getUserDetail]);

  const handleCloseX = () => {
    props.dispatch(clearUsersDetail());
    reset();
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit User">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleCloseX}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
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
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default connect(mapStateToProps, null)(EditDialog);
