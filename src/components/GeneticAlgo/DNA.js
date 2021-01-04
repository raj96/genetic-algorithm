import Gene from "./Gene";

class DNA {
  value = "";
  score = 0;

  constructor({ random, geneSize }) {
    if (random) {
      this.value = new Gene().createDNAValue({ size: geneSize });
    }
  }

  calculateScore(targetString) {
    if (targetString.length == this.value.length) {
      for (let i = 0; i < targetString.length; i++) {
        this.score += Math.pow(
          this.value.charCodeAt(i) - targetString.charCodeAt(i),
          2
        );
      }
    }

    return this.score;
  }
}

export default DNA;
