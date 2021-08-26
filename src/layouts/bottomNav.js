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
import CreditCardRoundedIcon from "@material-ui/icons/CreditCardRounded";
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
import PermMediaRoundedIcon from "@material-ui/icons/PermMediaRounded";
import HotelRounded from "@material-ui/icons/HotelRounded";
import BurstModeRoundedIcon from "@material-ui/icons/BurstModeRounded";
import HowToRegRoundedIcon from "@material-ui/icons/HowToRegRounded";
import SubtitlesRoundedIcon from "@material-ui/icons/SubtitlesRounded";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListSubheader from "@material-ui/core/ListSubheader";
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
            onClick={() => router.push("/master/status-server")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Kartu Pasien
          </ListSubheader>
        }
      >
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/kartu-pasien/data-pasien")}
          >
            <ListItemIcon>
              <SupervisedUserCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Data Pasien" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/kartu-pasien/perawatan")}
          >
            <ListItemIcon>
              <HotelRounded />
            </ListItemIcon>
            <ListItemText primary="Perawatan" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/kartu-pasien/dokter")}
          >
            <ListItemIcon>
              <AssignmentIndRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dokter" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/kartu-pasien/ba")}
          >
            <ListItemIcon>
              <HowToRegRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Beauty Terapist  " />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/kartu-pasien/lokasi-foto-before")}
          >
            <ListItemIcon>
              <BurstModeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Lokasi Foto Before" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => router.push("/kartu-pasien/lokasi-foto-after")}
          >
            <ListItemIcon>
              <PermMediaRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Lokasi Foto After" />
          </ListItem>
        </List>
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Barcode
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemIcon>
            <SubtitlesRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Comming Soon" />
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Tcard
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemIcon>
            <CreditCardRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Comming Soon" />
        </ListItem>
      </List>
    </div>
  );

  useEffect(() => {
    if (router.pathname == "/") {
      setValue("Home");
    } else if (router.pathname == "/setting") {
      setValue("Setting");
    } else {
      setValue("Data");
    }
    console.log(value);
  });
  return (
    <div className={classes.conten}>
      <div className={classes.appBar}>
        <AppBar position="static" className={classes.appBarColor}>
          <Toolbar>
            {value == "Data" ? (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              ""
            )}

            <Typography variant="h6" className={classes.title}>
              Rest Server
            </Typography>
            <Button color="inherit">Online</Button>
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
          label="Data"
          value="Data"
          onClick={() => router.push("/master/status-server")}
          icon={<StorageIcon />}
        />
        <BottomNavigationAction
          label="Setting"
          value="Setting"
          onClick={() => router.push("/setting")}
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
