import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontColor, fontFamily } from '../../constants/styles';

class StyledButton extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text {...this.props} style={[styles.text, this.props.style]}>{this.props.title}</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    marginHorizontal: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1779ba'
  },
  text: {
    fontFamily,
    color: '#fefefe',
  }
});

export default StyledButton;