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
  const [bestDna, setBestDna] = useState(null);
  const [currentGen, setCurrentGen] = useState(0);
  const [genLog, setGenLog] = useState("");

  return (
    <Container style={style.rootContainer} maxWidth="lg">
      <Card elevation={10}>
        <CardContent>
          <InputSection setters={{ setBestDna, setCurrentGen, setGenLog }} />
          <Divider />
          <ProgressSection getters={{ bestDna, currentGen, genLog }} />
        </CardContent>
      </Card>
    </Container>
  );
}

function InputSection({ setters }) {
  const { setBestDna, setCurrentGen, setGenLog } = setters;
  let generation = 1;

  let textInputRef = useRef();
  const startGenAlgo = (value) => {
    let population = new Population(value);
    let loop = () => {
      if (generation % 10 === 0) console.log(population);
      setTimeout(() => {
        setCurrentGen(generation);
        population.matePopulation();
        population.calculateScores();
        setBestDna(population.bestDna);
        setGenLog((prevLog) => {
          return (
            `Gen ${generation}: ${population.bestDna.value}\tScore: ${population.bestDna.score}\n` +
            prevLog
          );
        });
        generation++;
        if (population.bestDna.value !== value) loop();
      }, 10);
    };
    loop();
  };

  const handleClick = () => {
    if (!textInputRef.current || !textInputRef.current.value) return;
    startGenAlgo(textInputRef.current.value);
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
          inputRef={(ref) => (textInputRef.current = ref)}
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

function ProgressSection({ getters }) {
  const { bestDna, currentGen, genLog } = getters;

  return (
    <Grid container justify="center" style={{ margin: "2vh 0vh 2vh 0vh" }}>
      <Grid item>
        <Typography variant="h4">
          <b>Best DNA:</b> {bestDna?.value}
        </Typography>
      </Grid>
      {/*log section*/}
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Card elevation={1}>
            <CardHeader
              title="Generation Log"
              action={`Population: 50 | Gen: ${currentGen}`}
            ></CardHeader>
            <CardContent>
              <TextField
                fullWidth
                multiline
                disabled
                rowsMax={15}
                value={genLog}
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
