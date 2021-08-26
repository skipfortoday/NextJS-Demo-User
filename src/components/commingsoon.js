import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
  },
  paper: {
    height: 80,
  },
});

export default function CommingSoon() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1} alignItems="center" justify="center">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h3" component="h2" align="center">
                Comming Soon....
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Image
              src="/CodeReview.svg"
              width="400"
              height="400"
              alt="Comming Soon"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions onClick={() => router.push("/master/status-server")}>
        <Button size="small">Kembali Ke Dashboard</Button>
      </CardActions>
    </Card>
  );
}
