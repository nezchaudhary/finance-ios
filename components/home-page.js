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
      // <ScrollView>
        <View style={viewStyles.appContainer}>
          <View style={viewStyles.titleContainer}>
            <View style={viewStyles.titleTextContainer}>
              <Text>
                <StyledText style={textStyles.investiLogo} text='Investi' />
                <StyledText style={textStyles.meLogo} text='Me' />
              </Text>
            </View>
          </View>
          <ScrollView>
          <KeyboardAwareScrollView>
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
                <UserPortfolio />
              </View>
              {this.renderPortfolioChangeData()}
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
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
    marginTop: '5%',
  },
  userPortfolioContainer: { //user portfolio container
    marginTop: '5%',
  },
  portfolioChangeContainer: { // portfolio change data container
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
});

const mapStateToProps = (state) => {
  const { userPortfolioTotal } = state;
  return { userPortfolioTotal };
};

export default connect(mapStateToProps)(HomePage);
