import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PieChart from 'react-native-pie-chart';

import StyledText from '../../text/styled-text';
import DoughnutLegend from './doughnut-legend';
import RiskLevelPortfolios from '../../../mock-data/risk-level-portfolios';
import { generateChartData, generateChartDataObject, getHeader } from './doughnut-chart-data';

class DoughnutChart extends Component {

  collectData() {
    // const total = this.props.userPortfolio ? getPortfolioSize(this.props.userPortfolio) : 0;
    const riskLevel = this.props.selectedLevel;
    // const userPortfolio = this.props.userPortfolio;
    // const userPortfolioValues = this.props.userPortfolio ? Object.values(this.props.userPortfolio) : null;
    const type = this.props.type;
    const investments = this.props.investmentTypes;
    // return { total, riskLevel, userPortfolio, userPortfolioValues, type, investments };
    return { type, investments };
  }

  getData() {
    console.log('chart mein risk level', this.props.riskLevel);
    if (this.props.riskLevel) {
      const p = RiskLevelPortfolios[this.props.riskLevel];
      const percentages = Object.values(p);
      let label;
      return this.props.investmentTypes.reduce((result, type, i) => {
        // label = portfolio ? `${type.name} - $${formatDollarString(portfolio[index])} (${percentages[index]}%)`
        if (percentages[i] > 0) {
          label = `${type.name} (${percentages[i]}%)`;
          result.data.push(percentages[i]);
          result.colors.push(type.color);
          result.labels.push(label);
        }
        return result;
      }, {data: [], colors:[], labels: []});
    }
    return null;
  }

  render() {
    const data = this.collectData();
    const d = this.getData();
      return (
        <ScrollView style={{ flex: 1 }}>
          <View>
            <StatusBar
              hidden={true}
            />
            <StyledText style={{ fontWeight: 'bold' }} text="Basic Doughnut">Basic</StyledText>
            <PieChart
              chart_wh={200}
              series={d.data}
              sliceColor={d.colors}
              doughnut={true}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
          </View>
          <DoughnutLegend data={d}/>
        </ScrollView>
      );
  }
}

const mapStateToProps = (state) => ( { riskLevel: state.riskLevel, investmentTypes: state.investmentTypes });
export default connect(mapStateToProps)(DoughnutChart);