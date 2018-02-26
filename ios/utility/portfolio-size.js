// this function returns the total size of user's portfolio
const getPortfolioSize = (portfolio) => {
  let total = 0;
  for (let type in portfolio) {
    total += portfolio[type];
  }
  return total;
}

export default getPortfolioSize;