import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontColor, fontFamily, fontSize } from '../../constants/styles';
 
export default class RegularText extends Component {
  render() {
    return (
      <Text style={[styles.text, this.props.style]}>
      {this.props.text}</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: fontColor,
    fontFamily,
    fontSize,
  },
});