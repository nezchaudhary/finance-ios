import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import StyledText from '../../styled-components/text/styled-text';
import { getWidthSizeForScreen } from '../../../constants/layout';

export default class DoughnutLegend extends Component {
  render() {
    return (
      <View>
        <View style={viewStyles.legendItems}>
            {this.props.data.labels.map((value, index) => {
              const backgroundColor = `${this.props.data.colors[index]}`;
              return (
                <View style={viewStyles.legendItem} key={value}>
                  <View style={[viewStyles.itemColor, { backgroundColor } ]}></View>
                  <StyledText style={textStyles.itemData} text={` ${value}`} /> 
                </View>
              );
            })}
        </View>
      </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  // Legend items container view
  legendItems: {
    flex: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // legend item main box view
  legendItem: {
    flexDirection: 'row',
    paddingRight: '4%',
    paddingBottom: '1%',
  },
  // legend item color box
  itemColor: {
    width: getWidthSizeForScreen(25, 30, 40),
    height: getWidthSizeForScreen(10, 12, 15),
  },
});

const textStyles = StyleSheet.create({
  // legend item text
  itemData: {
    fontSize: getWidthSizeForScreen(10.75, 12, 12),
    color: '#737373',
  },
});