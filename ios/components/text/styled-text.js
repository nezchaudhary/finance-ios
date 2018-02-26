import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontColor, fontFamily, fontSize } from '../../constants/styles';
 
class RegularText extends Component {
  render() {
    return (
      <Text style={[style.text, this.props.style]}>
      {this.props.text}</Text>
    )
  }
}

const style = StyleSheet.create({
  text: {
    color: fontColor,
    fontFamily,
    fontSize
  }
});

export default RegularText;