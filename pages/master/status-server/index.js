import React, { useState, useEffect } from "react";
import CardServer from "../../../src/components/card-server";
import BottomNav from "../../../src/layouts/bottomNav";
import { Grid } from "@material-ui/core/";
import io from "socket.io-client";
import Grow from "@material-ui/core/Grow";
import Config from "../../../src/config";

const StatusServer = () => {
  const [isOnline, setIsOnline] = useState([]);
  const [isOnline1, setIsOnline1] = useState("Off");
  const [isOnline2, setIsOnline2] = useState("Off");
  const [render, setRender] = useState(true);

  function handleStatusChange(data) {
    setIsOnline(data);
  }

  function cariParam1() {
    let data = isOnline.find((element) => element == `${Config.ipJK1}`);
    let finalData = data == undefined ? "Offline" : "Online";
    setIsOnline1(finalData);
    return finalData;
  }

  function cariParam2() {
    let data = isOnline.find((element) => element == `${Config.ipJK2}`);
    let finalData = data == undefined ? "Offline" : "Online";
    setIsOnline2(finalData);
    return finalData;
  }

  useEffect(() => {
    if (render == true) {
      const socket = io(`${Config.baseURL}`,
	{
		extraHeaders: {
			Ip: 'Test data ip'	
		} 
	});
      socket.on("connect", () => {
        socket.on("some event", (msg) => {
	console.log(msg.list)
          msg.list
            ? handleStatusChange(msg.list)
            : console.log("Hmm Something with Socket");
        });
        setRender(false);
      });
    }
    cariParam1();
    cariParam2();
  });

  return (
    <>
      <Grow in mountOnEnter unmountOnExit>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <CardServer Nama="Jakarta 1" Lokasi="JK1-PIK" Status={isOnline1} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardServer
              Nama="Jakarta 2"
              Lokasi="JK2-SIMPRUG"
              Status={isOnline2}
            />
          </Grid>
        </Grid>
      </Grow>
    </>
  );
};

StatusServer.layout = BottomNav;
export default StatusServer;
