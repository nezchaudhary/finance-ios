import RiskLevelPortfolios from '../../../mock-data/risk-level-portfolios';
import { calculateHowToMoveInvestments } from '../../../calculate-portfolio-shift';
import { formatDollarString } from '../../../utility/format-dollar-string.js';

const createChartDataSet = (investments, percentages, portfolio) => {
  let label;
  return investments.reduce((data, type, index) => {
    label = portfolio ? `${type.name} - $${formatDollarString(portfolio[index])} (${percentages[index]}%)`
      : `${type.name} (${percentages[index]}%)`;
    if (percentages[index]) {
      data.labels.push(label);
      data.colors.push(type.color);
      data.values.push(percentages[index]);
    }
    return data;
  }, { labels: [], colors: [], values: [] });
}

const getPercentages = (portfolio, total) => {
  return portfolio.map(value => Math.round((value / total) * 100));
};

const calculateIdealRiskUserPortfolio = (userPortfolio, idealRiskPortfolio) => {
  
}

const generateChartData = (data) => {
  
  // data needed for function
  const { riskLevel, userPortfolio, userPortfolioValues, total, type, investments } = data;
  const riskValues = Object.values(RiskLevelPortfolios[riskLevel]);
  const riskPortfolio = RiskLevelPortfolios[riskLevel];
  let chartData;

  // chart data for risk, user and user risk if total was 0 
  if (type === 'risk-portfolio' || type === 'user-portfolio' || (type === 'user-risk-portfolio' && !total)) {
    let percentages = type === 'user-portfolio' ? getPercentages(userPortfolioValues, total) : riskValues;
    let portfolio = type === 'user-portfolio' ? userPortfolioValues : null;
    chartData = createChartDataSet(investments, percentages, portfolio);
  
  } else {

    // Calculate ideal risk portfolio for user when portfolio is provided
    const changes = calculateHowToMoveInvestments(userPortfolio, riskPortfolio);
    const portfolio = Object.assign({}, userPortfolio);
    changes.map(change => {
      portfolio[change.from] -= change.value;
      portfolio[change.to] += change.value;
    });
    const adjustedPortfolio = Object.values(portfolio);
    const percentages = getPercentages(adjustedPortfolio, total);
    chartData = createChartDataSet(investments, percentages, adjustedPortfolio);
  }
  return chartData;
}

export {
  generateChartData,
  createChartDataSet,
}