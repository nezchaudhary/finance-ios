import getPortfolioSize from '../utility/portfolio-size.js';
import formatChangeData from '../utility/format-change-data.js';

const types = ['Cash', 'Bonds', 'Mutual Funds', 'Gold', 'Stocks']; // Array of different types of investments

/*

// Input: Ideal portfolio based on risk in percentages, current user portfolio
// Output: Minimum value of investments that need to be moved to match ideal and current
// Constraint: Minimum adjustments that need to be made, keep complexity at lowest
// Edge Cases: Floating points, rounded figures might not add up, portfolio is empty

Strategy:
// Calculate user portfolio size by adding all investment values
// Calculate user ideal portfolio but mapping total size to ideal percentage distribution 
  // Adjust last one to left over value to avoid edge cases of rounding numbers
// Calculate difference between ideal and current portfolio
// Sort difference in 2 arrays with max reductions and max increases
// Run a loop until all reductions have been adjusted with increases by popping values from both as you go

Big O: O(n) // all iterations are linear in nature with constant look ups
       sorting is nlog(n) for reductions and increases

Transformation: 
  ideal = [20, 5, 25, 15, 35]; // percentages
  userP = [70, 46, 67, 87, 32]; // current user portfolio in dollar values
  userIdealP = [60, 15, 76, 45, 106]; // ideal user portfolio in dollar values
  difference = [-10, -31, 9, -42, 74] // difference between ideal and current
  decrease = [-10, -31, -42]; increase = [9, 74]; // divide in 2 arrays to adjust and sort them
  decrease = [-10, -31]; increase = [9, 32]; // start popping values that have been adjusted
  decrease = [-10]; increase = [9, 1];
  decrease = [-9]; increase = [9];
  decrease = []; increase = [];
*/

// this function returns the user's ideal portfolio based on the size
const calculateIdealUserPortfolio = (userPortfolio, riskPortfolio) => {
  const idealPortfolioPercentages = Object.values(riskPortfolio);
  const userPortfolioSize = getPortfolioSize(userPortfolio);
  let sumOfValues = 0;
  return idealPortfolioPercentages.map((percent, i) =>  {
    let value;
    if (i !== types.length - 1) {
      value = Math.round((percent / 100) * userPortfolioSize);
      sumOfValues += value;
    } else {
      value = userPortfolioSize - sumOfValues;
    }
    return value;
  });
}

// this function calculates the difference in portfolios
const calculateDifferenceInDollars = (userPortfolio, riskPortfolio) => {
  const userIdealPortfolio = calculateIdealUserPortfolio(userPortfolio, riskPortfolio);
  const userInvestments = Object.values(userPortfolio);
  const differences = userInvestments.reduce((result, current, i) => {
    const difference = userIdealPortfolio[i] - current;
    if (difference !== 0) {
      result.push({ name: types[i], value: difference })
    }
    return result;
  }, []);
  return differences;
};

// Divide differences into investments that need to increase and decrease
const sortDifferencesByIncreaseAndDecrease = (differences) => {
  const sorted = differences.sort((a, b) => a.value - b.value);
  let decreaseEnd;
  let increaseStart;
  
  for (let i = 0; i < sorted.length; i++) {
    if (decreaseEnd && increaseStart) {
      break;
    }

    if (sorted[i].value === 0) {
      decreaseEnd = i;
    } else if (sorted[i].value > 0) {
      increaseStart = i;
      if (!decreaseEnd) decreaseEnd = i;
    }
  }

  const decrease = sorted.slice(0, decreaseEnd).reverse();
  const increase = sorted.slice(increaseStart);
  return { decrease, increase };
}

// this function returns an array of strings that tells us how to adjust investments
const calculateHowToMoveInvestments = (user, ideal) => {
  const differences = calculateDifferenceInDollars(user, ideal);
  const { increase, decrease } = sortDifferencesByIncreaseAndDecrease(differences);
  const investmentsToMove = []; // Array to push string values of investments to move
  
  // Run a while loop until values have been adjusted
  while(decrease.length) {
    let maxDecrease = decrease[decrease.length - 1];
    let maxIncrease = increase[increase.length - 1];
    if (maxIncrease.value - Math.abs(maxDecrease.value) > 0) { // max increase is larger than max decrease
      investmentsToMove.push(formatChangeData(maxDecrease.name, maxIncrease.name, Math.abs(maxDecrease.value)));
      increase[increase.length - 1].value -= Math.abs(maxDecrease.value);
      decrease.pop();
    } else if (maxIncrease.value - Math.abs(maxDecrease.value) < 0) { // max decrease is larger than max increase
      investmentsToMove.push(formatChangeData(maxDecrease.name, maxIncrease.name, maxIncrease.value));
      decrease[decrease.length - 1].value += maxIncrease.value;
      increase.pop();
    } else { // decrease and increase are of same size
      investmentsToMove.push(formatChangeData(maxDecrease.name, maxIncrease.name, maxIncrease.value));
      increase.pop();
      decrease.pop();
    }
  }
  return investmentsToMove;
};

export { 
  calculateHowToMoveInvestments, 
  calculateIdealUserPortfolio, 
  calculateDifferenceInDollars, 
  sortDifferencesByIncreaseAndDecrease 
};