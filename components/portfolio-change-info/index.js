import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { calculateHowToMoveInvestments } from '../../calculate-portfolio-shift/index';
import RiskPortfolios from '../../mock-data/risk-level-portfolios';
import formatDollarString from '../../utility/format-dollar-string';
import StyledText from '../text/styled-text';
import StyledButton from '../button/';
import { getWidthSizeForScreen } from '../../constants/layout';
import { updateUserPortfolio } from '../../actions/update-user-portfolio';
import { fontColor } from '../../constants/styles';

class PortfolioChangeData extends Component {
  constructor() {
    super();
    this.state = {
      renderAgain: false
    }
  }

  handleChangeItemClick(change) {
    const updatedPortfolio = Object.assign(this.props.userPortfolio);
    updatedPortfolio[change.from] -= change.value;
    updatedPortfolio[change.to] += change.value;
    this.props.updateUserPortfolio(updatedPortfolio);
    this.setState({ renderAgain: true });
  }

  render() {
    if (!this.props.userPortfolio && !this.props.userPortfolioTotal) return null;
    const changes = calculateHowToMoveInvestments(this.props.userPortfolio, RiskPortfolios[this.props.riskLevel]);
    const header = changes.length ? "To match your portfolio to the risk portfolio.." 
      : "Your portfolio is match to your risk level, you do not need to make any changes";
    return (
      <View>
        <StyledText
          style={[textStyles.portfolioChangeHeader, textStyles.portfolioSize]}
          text={`Your portfolio size: $${formatDollarString(this.props.userPortfolioTotal)}`}
        />
        <StyledText 
          style={textStyles.portfolioChangeHeader} 
          text={header}
        />
        {changes.map((change, i) => {
          return (
            <View 
              style={viewStyles.changeListItemView}
              key={`${change.from} ${change.to} ${change.value}`}
            >
              <StyledButton key={`${change.from} ${change.to} ${change.value}`} 
                title={`${'\u2022'} Move $${formatDollarString(change.value)} from ${change.from} to ${change.to}`}
                style={textStyles.changeListItem}
                click={() => this.handleChangeItemClick(change)}
                clear={true}
              />
            </View>
          )
        })}
      </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  changeListItemView: {
    alignItems: 'flex-start',
  }
})

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
    marginHorizontal: '6.5%',
    fontWeight: 'normal',
    color: fontColor,
    textAlign: 'left',
  }
})

const mapStateToProps = (state) => {
  const { riskLevel, userPortfolio, userPortfolioTotal } = state;
  return { riskLevel, userPortfolio, userPortfolioTotal };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateUserPortfolio }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChangeData);
