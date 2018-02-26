// This is mock data to illustrate the 10 levels of risk portfolios
// based on 5 investments. Its meant for development only

// Class constructor for each portfolio
class Portfolio {
  constructor(cash, bonds, mutualFunds, gold, stocks) {
    this.cash = cash;
    this.bonds = bonds;
    this.mutualFunds = mutualFunds;
    this.gold = gold;
    this.stocks = stocks;
  }
}

// Percentage values for portfolios at risk levels as keys
const investmentDistribution = {
  1: [50, 40, 10, 0, 0],
  2: [40, 30, 20, 10, 0],
  3: [30, 30, 20, 10, 10],
  4: [20, 30, 30, 10, 10],
  5: [10, 20, 40, 15, 15],
  6: [5, 10, 50, 20, 15],
  7: [0, 5, 50, 25, 20],
  8: [0, 0, 30, 30, 40],
  9: [0, 0, 20, 30, 50],
  10: [0, 0, 10, 30, 60],
}

const riskLevelPortfolios = {};

// Create a new instance of each portfolio
for (let risk = 1; risk <= 10; risk++) {
  riskLevelPortfolios[risk] = new Portfolio(...investmentDistribution[risk]);
};

export default riskLevelPortfolios;
