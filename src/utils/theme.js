import { grey, yellow } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  // Customize Material-UI with your theme
  // See more here: https://material-ui.com/customization/themes/
  palette: {
    type: "light",
    primary: {
      main: yellow[50],
      mainGradient:
        "linear-gradient(90deg, rgba(254,255,247,1) 0%, rgba(255,192,0,1) 0%, rgba(255,124,0,1) 100%);",
    },
    secondary: {
      main: grey[700],
    },
    tabs: {
      backgroundColor: "red",
    },
    inkBar: {
      backgroundColor: "yellow",
    },
  },
});

export default theme;
