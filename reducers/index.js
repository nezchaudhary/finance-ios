import { combineReducers } from 'redux';
import RiskLevelReducer from './risk-level-reducer';
// import UserPortfolioReducer from './user-portfolio-reducer';
import InvestmentTypesReducer from './investments-reducer';

const rootReducer = combineReducers({
  riskLevel: RiskLevelReducer,
  // userPortfolio: UserPortfolioReducer,
  investmentTypes: InvestmentTypesReducer
});

export default rootReducer;