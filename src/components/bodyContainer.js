import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRef, useState } from "react";
import Population from "./GeneticAlgo/Population";

function BodyContainer() {
  const style = {
    rootContainer: {
      marginTop: "-25vh",
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

  const [mutationRate, setMutationRate] = useState(25);
  const [populationSize, setPopulation] = useState(300);
  let textInputRef = useRef();

  const startGenAlgo = (value) => {
    let population = new Population({
      targetString: value,
      populationSize,
      mutationRate,
    });
    let loop = () => {
      //   if (generation % 10 === 0) console.log(population);
      setTimeout(() => {
        setCurrentGen(generation);
        population.matePopulation();
        population.calculateScores();
        setBestDna(population.bestDna);
        setGenLog((prevLog) => {
          return (
            `Gen ${generation}: ${population.bestDna.value}\t\tScore: ${population.bestDna.score}\n` +
            prevLog
          );
        });
        generation++;
        if (population.bestDna.score !== 0) loop();
      }, 10);
    };
    loop();
  };

  const handleClick = () => {
    if (!textInputRef.current || !textInputRef.current.value) return;
    setGenLog("");
    setCurrentGen(0);
    setBestDna(null);

    startGenAlgo(textInputRef.current.value);
  };

  const mutationSliderMarks = [
    { value: 0, label: "0%" },
    { value: 100, label: "100%" },
  ];
  const populationSliderMarks = [{ value: 1000, label: "1000 DNAs" }];

  return (
    <Grid
      container
      spacing={0}
      justify="space-evenly"
      style={{ marginBottom: "1vh" }}
    >
      <Grid item xs={5}>
        <Grid container spacing={1} justify="space-evenly" alignItems="center">
          <Grid item xs={12}>
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
        </Grid>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={12}>
            <Typography id="population-slider-label" variant="body1">
              Population ({`${populationSize} DNAs`})
            </Typography>
            <Slider
              aria-labelledby="population-slider-label"
              value={populationSize}
              min={100}
              max={1000}
              step={10}
              marks={populationSliderMarks}
              valueLabelDisplay="auto"
              onChange={(_, val) => setPopulation(val)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography id="mutation-slider-label" variant="body1">
              Mutation Rate ({`${mutationRate}%`})
            </Typography>
            <Slider
              aria-labelledby="mutation-slider-label"
              value={mutationRate}
              valueLabelFormat={(value) => value + "%"}
              min={0}
              max={100}
              step={1}
              marks={mutationSliderMarks}
              valueLabelDisplay="auto"
              onChange={(_, val) => setMutationRate(val)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function ProgressSection({ getters }) {
  const { bestDna, currentGen, genLog } = getters;

  return (
    <Grid container justify="center" style={{ margin: "2vh 0vh 2vh 0vh" }}>
      <Grid item>
        <Typography variant="h6" align="center">
          <u>
            <b>Best DNA</b>
          </u>
          <br />
          {bestDna?.value}
        </Typography>
      </Grid>
      {/*log section*/}
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Card elevation={1}>
            <CardHeader
              title="Generation Log"
              action={`Gen: ${currentGen}`}
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

        <Grid item xs={1} />
      </Grid>
    </Grid>
  );
}

export default BodyContainer;
