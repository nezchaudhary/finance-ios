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

const generateChartData = (data) => {
  const { riskLevel, userPortfolio, userPortfolioValues, total, type, investments } = data;
  const riskValues = Object.values(RiskLevelPortfolios[riskLevel]);
  const riskPortfolio = RiskLevelPortfolios[riskLevel];
  let chartData;
  if (type === 'risk-portfolio') {
    chartData = createChartDataSet(investments, riskValues);
  } else {
    if (type === 'user-risk-portfolio') {
      if (!total) {
        chartData = createChartDataSet(investments, riskValues);
      } else {
        const changes = calculateHowToMoveInvestments(userPortfolio, riskPortfolio);
        const portfolio = investments.reduce((result, type, i) => {
          result[type.name] = userPortfolioValues[i];
          return result;
        }, {});
        changes.map(change => {
          portfolio[change.from] -= change.value;
          portfolio[change.to] += change.value;
        });
        const adjustedPortfolio = Object.values(portfolio);
        const percentages = adjustedPortfolio.map(value => Math.round((value / total) * 100));
        chartData = createChartDataSet(investments, percentages, adjustedPortfolio);
      }
    } else if (type === 'user-portfolio') {
      const percentages = userPortfolioValues.map(value => Math.round((value / total) * 100));
      chartData = createChartDataSet(investments, percentages, userPortfolioValues);
    }
  }
  return chartData;
}

const getHeader = (type, level, total) => {
  if (type === 'risk-portfolio') {
    return `Risk ${level} Portfolio`;
  } else if (type === 'user-portfolio') {
    return 'Your Current Portfolio';
  } else if (type === 'user-risk-portfolio' && total) {
    return `Your Ideal Level ${level} Portfolio`;
  } else if (type === 'user-risk-portfolio' && !total) {
    return `Risk ${level} Portfolio`;
  }
}

export {
  generateChartData,
  createChartDataSet,
  getHeader
}