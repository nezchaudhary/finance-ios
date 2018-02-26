import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { calculateHowToMoveInvestments } from '../../calculate-portfolio-shift/index';
import RiskPortfolios from '../../mock-data/risk-level-portfolios';
import { formatDollarString } from '../../utility/format-dollar-string';
import StyledText from '../text/styled-text';
import StyledButton from '../button/';
import { getWidthSizeForScreen } from '../../constants/layout';
import { updateUserPortfolio } from '../../actions/update-user-portfolio';
import { fontColor, clearButtonTextColor } from '../../constants/styles';

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

  renderListItem(item) {
    const change = item.item;
    return (
      <View
        style={viewStyles.changeListItemView}
      >
       <StyledText 
       text={`${'\u2022'}`}
       style={textStyles.bulletPoint}
       />
        <StyledButton
          title={`Move $${formatDollarString(change.value)} from ${change.from} to ${change.to}`}
          style={textStyles.changeListItem}
          click={() => this.handleChangeItemClick(change)}
          clear={true}
          onShowUnderlay={() => console.log()}
        />
      </View>
    )
  }
  
  getHeader(length) {
    const changeHeader = "To match your portfolio to the risk portfolio:";
    const noChangeHeader = "Your portfolio is match to your risk level, you do not need to make any changes";
    return length ? changeHeader : noChangeHeader;
  }

  render() {
    if (!this.props.userPortfolio && !this.props.userPortfolioTotal) return null;

    const changes = calculateHowToMoveInvestments(this.props.userPortfolio, RiskPortfolios[this.props.riskLevel]);
    changes.forEach(change => change.key = `${change.from} ${change.to} ${change.value}`);

    const header = this.getHeader(changes.length);
    
    return (
      <View style={viewStyles.portfolioChangeView}>
        <StyledText
          style={[textStyles.portfolioChangeText, textStyles.portfolioSize]}
          text='Your Portfolio Size'
        />
        <StyledText
          style={[textStyles.portfolioChangeText, textStyles.portfolioSizeNumber]}
          text={`$${formatDollarString(this.props.userPortfolioTotal)}`}
        />
        <StyledText 
          style={textStyles.portfolioChangeText} 
          text={header}
        />
        <FlatList
          data={changes}
          renderItem={(change) => this.renderListItem(change)}
        />
      </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  portfolioChangeView: {
    marginTop: '0.3%',
  },
  changeListItemView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: '10%',
    marginVertical: '0.5%',
  },
})

const textStyles = StyleSheet.create({
  portfolioChangeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2.25%',
    fontSize: getWidthSizeForScreen(14, 15, 16),
  },
  portfolioSize: {
    // fontSize: getWidthSizeForScreen(14, 16, 18),
    marginBottom: '1%',
  },
  portfolioSizeNumber: {
    fontSize: getWidthSizeForScreen(16, 18, 20),
    marginBottom: '3.5%',
  },
  changeListItem: {
    flex: 1,
    marginHorizontal: '1.5%',
    textAlign: 'left',
    fontSize: getWidthSizeForScreen(13, 14.5, 15),
  },
  bulletPoint: {
    color: clearButtonTextColor,
  },
})

const mapStateToProps = (state) => {
  const { riskLevel, userPortfolio, userPortfolioTotal } = state;
  return { riskLevel, userPortfolio, userPortfolioTotal };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateUserPortfolio }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChangeData);