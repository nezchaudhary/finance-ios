import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PieChart from 'react-native-pie-chart';

import StyledText from '../../text/styled-text';
import DoughnutLegend from './doughnut-legend';
import RiskLevelPortfolios from '../../../mock-data/risk-level-portfolios';
import { generateChartData, generateChartDataObject, getHeader } from './doughnut-chart-data';
import { getWidthSizeForScreen } from '../../../constants/layout';

class DoughnutChart extends Component {
  collectData() {
    const total = this.props.userPortfolioTotal;
    const riskLevel = this.props.riskLevel;
    const userPortfolio = this.props.userPortfolio;
    const userPortfolioValues = this.props.userPortfolio ? Object.values(this.props.userPortfolio) : null;
    const type = this.props.type;
    const investments = this.props.investmentTypes;
    return { total, riskLevel, userPortfolio, userPortfolioValues, type, investments };
  }

  render() {
    const data = this.collectData();
    const chartData = generateChartData(data);
    const header = getHeader(data.type, data.riskLevel, data.total);
      return (
          <View style={viewStyles.mainContainer}>
            <View style={viewStyles.chartHeader}>
              <StyledText style={textStyles.chartHeader} text={header}></StyledText>
            </View>
            <View style={viewStyles.chartContainer}>
              <PieChart
                chart_wh={getWidthSizeForScreen(225, 250, 300)}
                series={chartData.values}
                sliceColor={chartData.colors}
                doughnut={true}
                coverRadius={0.45}
                coverFill={'#FFF'}
              />
            </View>
            <View style={viewStyles.legendContainer}>
              <DoughnutLegend data={chartData}/>
            </View>
          </View>
      );
  }
}

const viewStyles = StyleSheet.create({
  mainContainer: { // main component view style
    alignItems: 'center',
    marginTop: '2%',
  },
  chartHeader: { // chart header view style
  },
  chartContainer: { // main chart view style
    marginTop: '2%',
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: '5%',
    // justifyContent: 'center',
    width: '92%',
  },
});

const textStyles = StyleSheet.create({
  chartHeader: { // chart header text style
    fontWeight: 'bold',
    fontSize: getWidthSizeForScreen(14, 16, 17),
  },
})

const mapStateToProps = (state) => {
  const { riskLevel, investmentTypes, userPortfolio, userPortfolioTotal } = state;
  return { riskLevel, investmentTypes, userPortfolio, userPortfolioTotal }
};

export default connect(mapStateToProps)(DoughnutChart);