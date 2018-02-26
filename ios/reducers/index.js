import { combineReducers } from 'redux';
import RiskLevelReducer from './risk-level-reducer';
import UserPortfolioReducer from './user-portfolio-reducer';
import InvestmentTypesReducer from './investments-reducer';
import UserPortfolioTotalReducer from './user-portfolio-total';

const rootReducer = combineReducers({
  riskLevel: RiskLevelReducer,
  userPortfolio: UserPortfolioReducer,
  investmentTypes: InvestmentTypesReducer,
  userPortfolioTotal: UserPortfolioTotalReducer
});

export default rootReducer;