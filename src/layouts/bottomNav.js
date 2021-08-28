import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useRouter } from "next/router";
import SettingsIcon from "@material-ui/icons/Settings";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppsIcon from "@material-ui/icons/Apps";
import StorageIcon from "@material-ui/icons/Storage";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import HttpIcon from "@material-ui/icons/Http";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    background: theme.palette.primary.mainGradient,
  },
  conten: {
    overflowX: "hidden",
    overflowY: "hidden",
  },
  appBar: {
    flexGrow: 1,
  },
  appBarColor: {
    background: theme.palette.primary.mainGradient,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  isi: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    background: theme.palette.primary.mainGradient,
  },
}));

export default function BottomNav({ children }) {
  const router = useRouter();
  const classes = useStyles();
  const [value, setValue] = React.useState("Data");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </List>
      <Divider />
      <List>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/bedocs")}
          >
            <ListItemIcon>
              <HttpIcon />
            </ListItemIcon>
            <ListItemText primary="BE docs" />
          </ListItem>
        </List>
      </List>
      <Divider />
      <List>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/fedocs")}
          >
            <ListItemIcon>
              <ViewCarouselIcon />
            </ListItemIcon>
            <ListItemText primary="FE docs" />
          </ListItem>
        </List>
      </List>
      <Divider />
    </div>
  );

  useEffect(() => {
    if (router.pathname == "/") {
      setValue("Home");
    } else if (router.pathname == "/fedocs") {
      setValue("fedocs");
    } else {
      setValue("bedocs");
    }
    console.log(value);
  });
  return (
    <div className={classes.conten}>
      <div className={classes.appBar}>
        <AppBar position="static" className={classes.appBarColor}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Users Demo
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      {["left", "right", "top", "bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <div className={classes.isi}>{children}</div>
      <BottomNavigation
        value={value}
        // onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Home"
          value="Home"
          onClick={() => router.push("/")}
          icon={<AppsIcon />}
        />
        <BottomNavigationAction
          label="BE docs"
          value="bedocs"
          onClick={() => router.push("/bedocs")}
          icon={<HttpIcon />}
        />
        <BottomNavigationAction
          label="FE docs"
          value="fedocs"
          onClick={() => router.push("/fedocs")}
          icon={<ViewCarouselIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
