import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { calculateHowToMoveInvestments } from '../../calculate-portfolio-shift/index';
import RiskPortfolios from '../../mock-data/risk-level-portfolios';
import formatDollarString from '../../utility/format-dollar-string';
import StyledText from '../text/styled-text';

class PortfolioChangeData extends Component {
  render() {
    const renderChanges = this.props.userPortfolio !== null;
    if (renderChanges) {
      if (!this.props.userPortfolioTotal) return null;
      const changes = calculateHowToMoveInvestments(this.props.userPortfolio, RiskPortfolios[this.props.riskLevel]);
      if (changes.length) {
        return (
          <View>
            <StyledText  
              style={{ fontWeight: 'bold' }} 
              text={`Your portfolio size: $${formatDollarString(this.props.userPortfolioTotal)}`}
            />
            <StyledText 
              style={{ fontWeight: 'bold' }} 
              text="To match your portfolio to the risk portfolio, you need to.." 
            />
            {changes.map((change, i) => (<StyledText key={i} text={`Move $${formatDollarString(change.value)} from ${change.from} to ${change.to}`} />))}
          </View>
        );
      } else {
        return (
          <StyledText 
            style={{ fontWeight: 'bold' }}
            text="Your portfolio is match to your risk level, you do not need to make any changes" 
          />
        );
      }
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  const { riskLevel, userPortfolio, userPortfolioTotal } = state;
  return { riskLevel, userPortfolio, userPortfolioTotal };
};

export default connect(mapStateToProps)(PortfolioChangeData);