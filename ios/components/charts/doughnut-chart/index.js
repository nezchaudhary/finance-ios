import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { connect } from 'react-redux';

import StyledText from '../../styled-components/text/styled-text';
import DoughnutLegend from './doughnut-legend';
import RiskLevelPortfolios from '../../../mock-data/risk-level-portfolios';
import { generateChartData, generateChartDataObject } from './doughnut-chart-data';
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
      return (
          <View style={viewStyles.mainContainer}>
            <View style={viewStyles.chartHeader}>
              <StyledText style={textStyles.chartHeader} text={this.props.header}></StyledText>
            </View>
            <View style={viewStyles.chartContainer}>
              <PieChart
                chart_wh={getWidthSizeForScreen(225, 250, 300)}
                series={chartData.values}
                sliceColor={chartData.colors}
                doughnut={true}
                coverRadius={0.45}
              />
            </View>
            <View style={viewStyles.legendContainer}>
              <DoughnutLegend data={chartData} />
            </View>
          </View>
      );
  }
}

const viewStyles = StyleSheet.create({
  // top level container for component
  mainContainer: { 
    alignItems: 'center',
    marginTop: '2%',
  },
  // chart header view
  chartHeader: { 
  },
  // chart view 
  chartContainer: { 
    marginTop: '2%',
  },
  // chart legend container view
  legendContainer: {
    flexDirection: 'row',
    marginTop: '5%',
  },
});

const textStyles = StyleSheet.create({
  // chart header text style
  chartHeader: { 
    fontWeight: 'bold',
    fontSize: getWidthSizeForScreen(14, 16, 17),
  },
})

const mapStateToProps = (state) => {
  const { riskLevel, investmentTypes, userPortfolio, userPortfolioTotal } = state;
  return { riskLevel, investmentTypes, userPortfolio, userPortfolioTotal }
};

export default connect(mapStateToProps)(DoughnutChart);
