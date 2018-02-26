import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StyledText from '../../text/styled-text';
import { getWidthSizeForScreen } from '../../../constants/layout';

class DoughnutLegend extends Component {
  render() {
    return (
      <View>
        <View style={viewStyles.legendItems}>
            {this.props.data.labels.map((value, index) => {
              const backgroundColor = `${this.props.data.colors[index]}`;
              return (
                <View style={textStyles.legendItem} key={value}>
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
  legendItems: {
    flex: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemColor: {
    width: getWidthSizeForScreen(25, 30, 40),
    height: getWidthSizeForScreen(10, 12, 15),
  },
});

const textStyles = StyleSheet.create({
  itemData: {
    fontSize: getWidthSizeForScreen(10.5, 11, 12),
    color: '#737373',
    // alignItems: 'baseline',
  },
  legendItem: {
    flexDirection: 'row',
    paddingRight: '4%',
    paddingBottom: '1%',
  }
});

export default DoughnutLegend;