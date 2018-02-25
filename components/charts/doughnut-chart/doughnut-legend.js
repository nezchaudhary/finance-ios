import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StyledText from '../../text/styled-text';
import { getWidthSizeForScreen } from '../../../constants/layout';

class DoughnutLegend extends Component {
  render() {
    return (
      <Text>
        {this.props.data.labels.map((value, index) => {
          const backgroundColor = `${this.props.data.colors[index]}`;
          return (
            <Text key={value}>{'   '}
              <View style={[viewStyles.itemColor, { backgroundColor } ]}></View>
              <StyledText style={textStyles.itemData} text={` ${value}`} /> 
            </Text>
          );
        })}
      </Text>
    );
  }
}

const viewStyles = StyleSheet.create({
  itemColor: {
    width: '25%',
    height: '11%',
    marginTop: '9.5%',
  }
});

const textStyles = StyleSheet.create({
  itemContainer: {
    marginRight: '10%',
  },
  itemData: {
    fontSize: getWidthSizeForScreen(10.5, 11, 12),
    color: '#737373',
  },
});

export default DoughnutLegend;