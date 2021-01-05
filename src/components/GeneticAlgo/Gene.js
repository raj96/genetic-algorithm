class Gene {
  createDNAValue = ({ size }) => {
    let dnaVal = "";

    for (let i = 0; i < size; i++) {
      dnaVal += this.randomGenome();
    }

    return dnaVal;
  };

  randomGenome() {
    const randomVal = Math.floor(Math.random() * 256);

    return String.fromCharCode(randomVal);
  }
}

export default Gene;
