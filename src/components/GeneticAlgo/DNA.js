import Gene from "./Gene";

class DNA {
  value = "";
  score = 0;

  constructor({ geneSize, value }) {
    if (value) {
      this.value = value;
    } else {
      this.value = new Gene().createDNAValue({ size: geneSize });
    }
  }

  calculateScore(targetString) {
    if (targetString.length === this.value.length) {
      for (let i = 0; i < targetString.length; i++) {
        this.score += Math.pow(
          this.value.charCodeAt(i) - targetString.charCodeAt(i),
          2
        );
      }
    } else this.score = Infinity;

    return this.score;
  }

  crossOver(dna, mutationRate) {
    let mutate = (newValue, mRate) => {
      if (Math.random() < mRate) {
        let index = Math.floor(Math.random() * newValue.length);
        return (
          newValue.substr(0, index) +
          new Gene().randomGenome() +
          newValue.substr(index + 1)
        );
      }
      return newValue;
    };

    // if (this.value === dna.value) {
    //   return new DNA({
    //     value: new Gene().createDNAValue({ size: this.value.length }),
    //   });
    // }

    let midPoint = Math.floor(Math.random() * this.value.length);
    let newValue = mutate(
      this.value.substr(0, midPoint) + dna.value.substr(midPoint),
      mutationRate / 100
    );

    return new DNA({ value: newValue });
  }
}

export default DNA;
