import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { calculateHowToMoveInvestments } from '../../calculate-portfolio-shift/index';
import RiskPortfolios from '../../mock-data/risk-level-portfolios';
import { formatDollarString } from '../../utility/format-dollar-string';
import StyledText from '../styled-components/text/styled-text';
import StyledButton from '../styled-components/button/';
import { getWidthSizeForScreen } from '../../constants/layout';
import { updateUserPortfolio } from '../../actions/update-user-portfolio';
import { clearButtonTextColor } from '../../constants/styles';

class PortfolioChangeData extends Component {
  constructor() {
    super();
    this.state = {
      renderAgain: false
    }
  }

  handleChangeItemClick(change) {
    const updatedPortfolio = Object.assign({}, this.props.userPortfolio);
    updatedPortfolio[change.from] -= change.value;
    updatedPortfolio[change.to] += change.value;
    this.props.updateUserPortfolio(updatedPortfolio);
    this.setState({ renderAgain: true });
  }

  getHeader(length) {
    const changeHeader = "To match your portfolio to the risk portfolio:";
    const noChangeHeader = "Your portfolio is match to your risk level, you do not need to make any changes";
    return length ? changeHeader : noChangeHeader;
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
          style={textStyles.changeListItemValue}
          click={() => this.handleChangeItemClick(change)}
          clear={true}
          onShowUnderlay={() => console.log()}
        />
      </View>
    )
  }

  renderText(text, styles) {
    return (
      <StyledText
        style={styles}
        text={text}
      />
    );
  }

  render() {
    if (!this.props.userPortfolio && !this.props.userPortfolioTotal) return null;

    const changes = calculateHowToMoveInvestments(this.props.userPortfolio, RiskPortfolios[this.props.riskLevel]);
    changes.forEach(change => change.key = `${change.from} ${change.to} ${change.value}`);

    const header = this.getHeader(changes.length);
    
    return (
      <View style={viewStyles.mainContainer}>
      {this.renderText('Your Portfolio Size', [textStyles.portfolioChangeText, textStyles.portfolioSizeTitle])}
      {this.renderText(`$${formatDollarString(this.props.userPortfolioTotal)}`, 
        [textStyles.portfolioChangeText, textStyles.portfolioSizeNumber]
      )}
      {this.renderText(header, textStyles.portfolioChangeText)}
        <FlatList
          data={changes}
          renderItem={(change) => this.renderListItem(change)}
        />
      </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  // top level container for component
  mainContainer: {
    marginTop: '0.3%',
  },
  // Change list item View
  changeListItemView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: '10%',
    marginVertical: '0.5%',
  },
})

const textStyles = StyleSheet.create({
  // text for whole component
  portfolioChangeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2.25%',
    fontSize: getWidthSizeForScreen(14, 15, 16),
  },
  // text for portfolio size title
  portfolioSizeTitle: {
    marginBottom: '1%',
  },
  // portfolio size number style
  portfolioSizeNumber: {
    fontSize: getWidthSizeForScreen(16, 18, 20),
    marginBottom: '3.5%',
  },
  // list item text style
  changeListItemValue: {
    flex: 1,
    marginHorizontal: '1.5%',
    textAlign: 'left',
    fontSize: getWidthSizeForScreen(13, 14.5, 15),
  },
  // bullet point text style
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