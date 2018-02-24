import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { fontColor, fontFamily } from '../../constants/styles';
import { getWidthSizeForScreen } from '../../constants/layout';

class StyledButton extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.view} underlayColor='#0e4a71' onPress={this.props.click}>
        <Text style={[styles.text, this.props.style]}>{this.props.title}</Text>
      </TouchableHighlight>
    )
  }
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    marginHorizontal: getWidthSizeForScreen(0, 30, 20),
    paddingVertical: getWidthSizeForScreen(10, 30, 40),
    paddingHorizontal: getWidthSizeForScreen(10, 20, 25),
    backgroundColor: '#1779ba'
  },
  text: {
    fontFamily,
    color: '#fefefe',
  }
});

export default StyledButton;