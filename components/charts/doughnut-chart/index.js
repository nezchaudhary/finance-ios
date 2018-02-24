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
        <ScrollView style={{ flex: 1 }}>
          <View>
            <StatusBar
              hidden={true}
            />
            <StyledText style={{ fontWeight: 'bold' }} text={header}></StyledText>
            <PieChart
              chart_wh={getWidthSizeForScreen(175, 200, 250)}
              series={chartData.values}
              sliceColor={chartData.colors}
              doughnut={true}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
          </View>
          <DoughnutLegend data={chartData}/>
        </ScrollView>
      );
  }
}

const mapStateToProps = (state) => {
  const { riskLevel, investmentTypes, userPortfolio, userPortfolioTotal } = state;
  return { riskLevel, investmentTypes, userPortfolio, userPortfolioTotal }
};

export default connect(mapStateToProps)(DoughnutChart);