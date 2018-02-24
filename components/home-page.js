import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import RiskLevels from './risk-levels';
import DoughnutChart from './charts/doughnut-chart';
import UserPortfolio from './user-portfolio';
import StyledText from './text/styled-text';
import PortfolioChangeInfo from './portfolio-change-info';

class HomePage extends Component {
  getRiskChartType() {
    return this.props.userPortfolioTotal ? 'user-risk-portfolio' : 'risk-portfolio';
  }

  renderPortfolioChangeData() {
    if (this.props.userPortfolioTotal) {
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
      <ScrollView>
        <View style={viewStyles.mainContainer}>
          <View style={viewStyles.logoContainer}>
            <Text style={textStyles.logo}>
              <StyledText style={textStyles.investiLogo} text='Investi' />
              <StyledText style={textStyles.meLogo} text='Me' />
            </Text>
          </View>
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
            <UserPortfolio />
          </View>
          {this.renderPortfolioChangeData()}
        </View>
      </ScrollView> 
    );
  }
}

const viewStyles = StyleSheet.create({
  mainContainer: { // top level container
    flex: 1,
    alignItems: 'center',
    marginTop: 35,
    backgroundColor: '#fff',
  },
  logoContainer: { // main logo container
    flex: 0.75
  },
  headerContainer: { // main header container
    flex: 0.2
  },
  riskLevelsContainer: { // slider container
    flex: 1
  },
  riskChartContainer: { // charts container
    flex: 4
  },
  userPortfolioContainer: {
    flex: 1,
  },
  portfolioChangeContainer: {
    flex: 1
  }
});

const textStyles = StyleSheet.create({
  logo: { // logo text 
    fontSize: 35
  },
  investiLogo: {
    color: '#96e1f2',
  },
  meLogo: {
    color: '#4b81aa',
  },
});

const mapStateToProps = (state) => {
  const { userPortfolioTotal } = state;
  return { userPortfolioTotal };
};
export default connect(mapStateToProps)(HomePage);
