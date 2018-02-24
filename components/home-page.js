import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { connect } from 'react-redux';

import RiskLevels from './risk-levels';
import DoughnutChart from './charts/doughnut-chart';
// import StyledButton from './button';
import UserPortfolio from './user-portfolio';
import StyledText from './text/styled-text';
import AppForm from './form';

class HomePage extends React.Component {
  render() {
    return (
      <View style={viewStyles.mainContainer}>
        <View style={viewStyles.logoContainer}>
          <Text style={textStyles.logo}>
            <StyledText style={textStyles.investiLogo} title='Investi' />
            <StyledText style={textStyles.meLogo} title='Me' />
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
          <DoughnutChart />
        </View>
          <View style={viewStyles.userPortfolioContainer}>
            <UserPortfolio />
          </View>
      </View>
      
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

// const mapStateToProps = (state) => {
//   const { investmentTypes, userPortfolioTotal } = state;
//   return { investmentTypes, userPortfolioTotal };
// };
// export default connect(mapStateToProps)(HomePage);
export default HomePage;
