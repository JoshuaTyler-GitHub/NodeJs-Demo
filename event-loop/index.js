console.log('start');

const wait = () => {
  return new Promise((resolve) => {
    console.log('resolve promise');
    resolve();
  });
};

const example = async () => {
  console.log('example');

  setTimeout(() => {
    console.log('timeout');
  }, 0);

  await wait();

  console.log('abc');
  //doing x
  // doing y
  // doing z 
};
example();

















































// const abc = () => {
//   console.log('abc');
// };



// const wait = (ms) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }