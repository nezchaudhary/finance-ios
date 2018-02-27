import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';

import RiskLevels from './risk-levels';
import DoughnutChart from './charts/doughnut-chart';
import UserPortfolio from './user-portfolio';
import StyledText from './styled-components/text/styled-text';
import PortfolioChangeInfo from './portfolio-change-info';
import { getWidthSizeForScreen } from '../constants/layout';
import { formatDollarString } from '../utility/format-dollar-string';


class HomePage extends Component {
  constructor() {
    super(); 
    this.state= {
      renderPortfolioChange: false,
    }
  }

  getRiskChartType() {
    return this.props.userPortfolioTotal ? 'user-risk-portfolio' : 'risk-portfolio';
  }

  getRiskChartHeader() {
    return this.props.userPortfolioTotal 
      ? `Your Ideal Level ${this.props.riskLevel} Portfolio` 
      : `Risk ${this.props.riskLevel} Portfolio`;
  }

  updateRenderPortfolioChange(value) {
    this.setState({ renderPortfolioChange : value });
  }

  renderPortfolioChangeData() {
    if (this.state.renderPortfolioChange && this.props.userPortfolioTotal) {
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
            <View style={viewStyles.headerViewContainer}>
              <StyledText  
                text="Compare your investment portfolio with a ideal investment portfolio for risk levels
                  between 1-10"
                  style={textStyles.headerText}
              />
            </View>
            <View style={viewStyles.riskLevelsContainer}>
              <RiskLevels />
            </View>
            <View style={viewStyles.riskChartContainer}>
              <DoughnutChart 
              type={this.getRiskChartType()}
              header={this.getRiskChartHeader()}/>
            </View>
            <View style={viewStyles.userPortfolioContainer}>
              <UserPortfolio updatePortfolioChange={this.updateRenderPortfolioChange.bind(this)} />
            </View>
            {this.renderPortfolioChangeData()}
            </View>
          </KeyboardAwareScrollView>
          
        </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  // top level container
  appContainer: { 
    flex: 1,
    alignItems: 'center',
  },
  // logo container
  titleContainer: {
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
  bodyContainer: {
    paddingHorizontal: '2.5%',
    marginBottom: '10%',
  },
  // header statement container
  headerViewContainer: {
    marginTop: '5%',
    paddingHorizontal: '2.5%',
  },
  // slider container
  riskLevelsContainer: {
    flex: 1,
  },
  // risk chart container
  riskChartContainer: {
    marginTop: '2%',
  },
  // user portfolio container
  userPortfolioContainer: {
    marginTop: '5%',
  },
  // portfolio change data container
  portfolioChangeContainer: { 
    marginTop: '5%',
  },
});

const logoFontSize = getWidthSizeForScreen(22, 25, 30)

const textStyles = StyleSheet.create({
  // 'investi' style
  investiLogo: { 
    fontSize: logoFontSize,
    color: '#96e1f2',
  },
  // 'me' style
  meLogo: { 
    fontSize: logoFontSize,
    color: '#4b81aa',
  },
  // main header text style
  headerText: {
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => {
  const { userPortfolioTotal, riskLevel } = state;
  return { userPortfolioTotal, riskLevel };
};

export default connect(mapStateToProps)(HomePage);