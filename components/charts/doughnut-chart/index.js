import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PieChart from 'react-native-pie-chart';

import BoldText from '../../text/bold-text';
import RiskLevelPortfolios from '../../../mock-data/risk-level-portfolios';

class DoughnutChart extends Component {
  getData() {
    if (this.props.riskLevel) {
      const p = RiskLevelPortfolios[this.props.riskLevel];
      const values = Object.values(p);
      return this.props.investmentTypes.reduce((result, type, i) => {
        if (values[i] > 0) {
          result.data.push(values[i]);
          result.colors.push(type.color);
        }
        return result;
      }, {data: [], colors:[]});
    }
    return null;
  }

  render() {
    const d = this.getData();
    if (d) {
      return (
  
        <ScrollView style={{ flex: 1 }}>
          <View>
            <StatusBar
              hidden={true}
            />
            <BoldText text="Basic Doughnut">Basic</BoldText>
            <PieChart
              chart_wh={200}
              series={d.data}
              sliceColor={d.colors}
              doughnut={true}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
          </View>
        </ScrollView>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => ( { riskLevel: state.riskLevel, investmentTypes: state.investmentTypes });
export default connect(mapStateToProps)(DoughnutChart);