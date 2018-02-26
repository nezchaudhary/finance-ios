const formatChangeData = (shiftFrom, shiftTo, amount) => {
  return { from: shiftFrom, to: shiftTo, value: amount };
};

export default formatChangeData;