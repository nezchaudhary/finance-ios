import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import RiskLevels from './risk-levels';
import DoughnutChart from './charts/doughnut-chart';
import UserPortfolio from './user-portfolio';
import StyledText from './text/styled-text';
import PortfolioChangeInfo from './portfolio-change-info';
import { getWidthSizeForScreen } from '../constants/layout';
import { paddingHorizontal } from '../constants/styles';
import formatDollarString from '../utility/format-dollar-string';


class HomePage extends Component {
  constructor() {
    super(); 
    this.state= {
      renderPortfolioChange: false,
    }
  }

  getRiskChartType() {
    console.log('tota', this.props.userPortfolioTotal);
    return this.props.userPortfolioTotal ? 'user-risk-portfolio' : 'risk-portfolio';
  }

  updateRenderPortfolioChange(value) {
    this.setState({ renderPortfolioChange : value });
  }

  renderPortfolioChangeData() {
    if (this.state.renderPortfolioChange) {
      return (
        <View style={viewStyles.portfolioChangeContainer}>
          <PortfolioChangeInfo />
        </View>
      )
    }
    return null;
  }

  render() {
    return (
      <View style={viewStyles.appContainer}>
        <View style={viewStyles.titleContainer}>
          <View style={viewStyles.titleTextContainer}>
            <Text>
              <StyledText style={textStyles.investiLogo} text='Investi' />
              <StyledText style={textStyles.meLogo} text='Me' />
            </Text>
          </View>
        </View>
     
        <KeyboardAwareScrollView extraHeight={100}>
          <View style={viewStyles.bodyContainer}>
            <View style={viewStyles.headerContainer}>
              <StyledText  
                text="Compare your investment portfolio with a ideal investment portfolio for risk levels
                  between 1-10"
              />
            </View>
            <View style={viewStyles.riskLevelsContainer}>
              <RiskLevels />
            </View>
            <View style={viewStyles.riskChartContainer}>
              <DoughnutChart type={this.getRiskChartType()}/>
            </View>
            <View style={viewStyles.userPortfolioContainer}>
              <UserPortfolio portfolioChange={this.updateRenderPortfolioChange.bind(this)} />
            </View>
            {this.renderPortfolioChangeData()}
            </View>
          </KeyboardAwareScrollView>
        </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  appContainer: { // top level container
    flex: 1,
    alignItems: 'center',
  },
  bodyContainer: {
    paddingHorizontal,
    marginBottom: '10%',
  },
  titleContainer: { // main logo container
    flexDirection: 'row',
    marginTop: '3%',
    borderStyle: 'solid',
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  titleTextContainer: {
    flex: 1,
    marginTop: '4%',
    marginBottom: '0.3%',
    alignItems: 'center',
  },
  headerContainer: { // main header container
    marginTop: '5%',
    paddingHorizontal,
  },
  riskLevelsContainer: { // slider container
    flex: 1,
  },
  riskChartContainer: { // charts container
    marginTop: '2%',
  },
  userPortfolioContainer: { //user portfolio container
    marginTop: '5%',
  },
  userPortfolioSize: {
    marginTop: '5%',
  },
  portfolioChangeContainer: { // portfolio change data container
    marginTop: '5%',
  },
});

const logoFontSize = getWidthSizeForScreen(22, 25, 30)

const textStyles = StyleSheet.create({
  investiLogo: { // 'investi' style
    fontSize: logoFontSize,
    color: '#96e1f2',
  },
  meLogo: { // 'me' style
    fontSize: logoFontSize,
    color: '#4b81aa',
  },
  userPortfolioSize: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,

  }
});

const mapStateToProps = (state) => {
  const { userPortfolioTotal } = state;
  return { userPortfolioTotal };
};

export default connect(mapStateToProps)(HomePage);