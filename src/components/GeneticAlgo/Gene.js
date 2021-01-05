class Gene {
  createDNAValue = ({ size }) => {
    let dnaVal = "";

    for (let i = 0; i < size; i++) {
      dnaVal += this.randomGenome();
    }

    return dnaVal;
  };

  randomGenome() {
    const base = 97;
    const randomVal = Math.floor(Math.random() * 26);

    if (randomVal === 0) return " ";
    return String.fromCharCode(base + randomVal);
  }
}

export default Gene;
