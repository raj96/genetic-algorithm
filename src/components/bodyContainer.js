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
import { useRef, useState } from "react";
import Population from "./GeneticAlgo/Population";

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
  let textInputRef = useRef();
  const handleClick = () => {
    let population = new Population(textInputRef.value);
    population.calculateScores();
    console.log(population);
  };

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
        <TextField
          fullWidth
          label="Target text"
          inputRef={(ref) => (textInputRef = ref)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Submit
        </Button>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

function ProgressSection() {
  const [bestDna, setBestDna] = useState("my name is raja");
  const [currentGen, setCurrentGen] = useState(1);
  const [genLog, setGenLog] = useState([
    "Best in gen 1: mahnapa sa ajar",
    "Best in gen 2: Something something",
  ]);

  return (
    <Grid container justify="center" style={{ margin: "2vh 0vh 2vh 0vh" }}>
      <Grid item>
        <Typography variant="h4">
          <b>Best DNA:</b> {bestDna}
        </Typography>
      </Grid>
      {/*log section*/}
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Card elevation={1}>
            <CardHeader
              title="Generation Log"
              action={`Population: 200 | Gen: ${currentGen}`}
            ></CardHeader>
            <CardContent>
              <TextField
                fullWidth
                multiline
                rowsMax={15}
                value={genLog.reduce(
                  (lineA, lineB) => lineA + "\n" + lineB + "\n"
                )}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={2} />
      </Grid>
    </Grid>
  );
}

export default BodyContainer;
