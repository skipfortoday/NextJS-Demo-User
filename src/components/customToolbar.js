import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import FormDialog from "./formDialog";

const defaultToolbarStyles = {
  iconButton: {},
};

function CustomToolbar() {
  return (
    <>
      <FormDialog />
    </>
  );
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
