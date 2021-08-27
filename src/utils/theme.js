import { lightBlue } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  // Customize Material-UI with your theme
  // See more here: https://material-ui.com/customization/themes/
  palette: {
    type: "light",
    primary: {
      main: lightBlue[400],
    },
    // secondary: {
    //   main: grey[700],
    // },
    // tabs: {
    //   backgroundColor: "red",
    // },
    // inkBar: {
    //   backgroundColor: "yellow",
    // },
  },
});

export default theme;
