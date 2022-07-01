const example = () => {
  return new Promise((resolve, reject) => {
    bat();
    resolve();
  });
}


const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}