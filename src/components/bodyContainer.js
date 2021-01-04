import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

function BodyContainer() {
  const style = {
    rootContainer: {
      marginTop: "-15vh",
    },
  };
  return (
    <Container style={style.rootContainer} maxWidth="lg">
      <Card elevation={10}>
        <CardContent>
          <InputSection />
          <Divider />
          <ProgressSection />
        </CardContent>
      </Card>
    </Container>
  );
}

function InputSection() {
  return (
    <Grid
      container
      spacing={1}
      justify="space-evenly"
      alignItems="center"
      style={{ margin: "2vh 0vh 2vh 2vh" }}
    >
      <Grid item xs={3} />
      <Grid item xs={4}>
        <TextField fullWidth label="Target text" />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

function ProgressSection() {
  const [bestDna, setBestDna] = useState("my name is raja");
  return (
    <Grid container justify="center" style={{ margin: "2vh 0vh 2vh 0vh" }}>
      <Grid item>
        <Typography variant="h4">
          <b>Best DNA:</b> {bestDna}
        </Typography>
      </Grid>
      {/*log section*/}
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Card elevation={1}>
            <CardHeader
              title="Generation Log"
              action="Population: 200 | Gen: 5"
            ></CardHeader>
            <CardContent>
              <TextField fullWidth multiline rowsMax={15} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3} />
      </Grid>
    </Grid>
  );
}

export default BodyContainer;
