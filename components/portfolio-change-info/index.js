import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { calculateHowToMoveInvestments } from '../../calculate-portfolio-shift/index';
import RiskPortfolios from '../../mock-data/risk-level-portfolios';
import formatDollarString from '../../utility/format-dollar-string';
import StyledText from '../text/styled-text';
import { getWidthSizeForScreen } from '../../constants/layout';

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
              style={[textStyles.portfolioChangeHeader, textStyles.portfolioSize]}
              text={`Your portfolio size: $${formatDollarString(this.props.userPortfolioTotal)}`}
            />
            <StyledText 
              style={textStyles.portfolioChangeHeader} 
              text="To match your portfolio to the risk portfolio.." 
            />
            {changes.map((change, i) => {
              return (
                <StyledText key={i} 
                  text={`- Move $${formatDollarString(change.value)} from ${change.from} to ${change.to}`}
                  style={textStyles.changeListItem} 
                />
              )
            })}
          </View>
        );
      } else {
        return (
          <StyledText 
            style={textStyles.portfolioChangeHeader} 
            text="Your portfolio is match to your risk level, you do not need to make any changes" 
          />
        );
      }
    }
    return null;
  }
}

const textStyles = StyleSheet.create({
  portfolioChangeHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '0.5%',
  },
  portfolioSize: {
    fontSize: getWidthSizeForScreen(14, 15, 16),
    marginBottom: '2%',
  },
  changeListItem: {
    marginTop: '0.5%',
    marginHorizontal: '10%',
  }
})

const mapStateToProps = (state) => {
  const { riskLevel, userPortfolio, userPortfolioTotal } = state;
  return { riskLevel, userPortfolio, userPortfolioTotal };
};

export default connect(mapStateToProps)(PortfolioChangeData);

// <StyledText  
//   style={[textStyles.portfolioChangeHeader, textStyles.portfolioSize]} 
//   text={`Your portfolio size: $${formatDollarString(this.props.userPortfolioTotal)}`}
// />