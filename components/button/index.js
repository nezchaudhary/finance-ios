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
    marginHorizontal: getWidthSizeForScreen(50, 55, 60),
    paddingVertical: getWidthSizeForScreen(10, 12, 15),
    backgroundColor: '#1779ba'
  },
  text: {
    fontFamily,
    color: '#fefefe',
    fontSize: getWidthSizeForScreen(13, 14, 16),
  }
});

export default StyledButton;