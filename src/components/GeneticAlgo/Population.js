import DNA from "./DNA";

class Population {
  populationSize = 50;
  // matingPoolSize = 200;
  mutationRate = 1; //Percent

  targetString = "";
  bestDna = "";
  setBestDna = null;

  population = [];

  constructor(targetString, setBestDna) {
    this.targetString = this.cleanseString(targetString);
    this.setBestDna = setBestDna;
    this.createInitialPopulation();
  }

  cleanseString(string) {
    let newString = "";

    for (let char of string) {
      if ((char >= "a" && char <= "z") || char === " ") {
        newString += char;
      }

      if (char >= "A" && char <= "Z") {
        newString += String.fromCharCode(char.charCodeAt(0) + 32);
      }
    }

    return newString;
  }

  createInitialPopulation() {
    for (let i = 0; i < this.populationSize; i++) {
      this.population.push(new DNA({ geneSize: this.targetString.length }));
    }
    this.calculateScores();
  }

  calculateScores() {
    let minScore = Infinity;

    this.population.forEach((dna) => {
      if (dna.calculateScore(this.targetString) < minScore) {
        minScore = dna.score;
        this.bestDna = dna;
      }
    });

    //console.log(this.population.sort((dna1, dna2) => dna1.score > dna2.score));
  }

  matePopulation() {
    let newPopulation = [];
    for (let i = 0; i < this.populationSize; i++) {
      newPopulation.push(
        this.bestDna.crossOver(this.population[i], this.mutationRate)
      );
    }
    this.population = newPopulation;
  }
}

export default Population;
