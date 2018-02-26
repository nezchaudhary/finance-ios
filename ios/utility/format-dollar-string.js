// this function formats a number dollar amount and returns a string format with commas
const formatDollarString = (number) => {
  const value = number.toString();
  let result = '';
  let count = 0;
  for (let i = value.length - 1; i >= 0; i--) {
    if (count === 3) {
      result = `${value[i]},${result}`;
      count = 1;
    } else {
      result = `${value[i]}${result}`;
      count++;
    }
  }
  return result;
}

const removeCommas = (value) => {
  let parsed = '';
  for (let i = 0; i < value.length; i++ ) {
    if (value[i] !== ',') parsed += value[i];
  }
  return parsed;
};

export {
  formatDollarString,
  removeCommas,
} 