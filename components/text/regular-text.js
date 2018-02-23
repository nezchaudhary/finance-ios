import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontColor } from '../../styles/main';
 
class RegularText extends Component {
  render() {
    return (
      <Text style={style.text}>
      {this.props.text}</Text>
    )
  }
}

const style = StyleSheet.create({
  text: {
    color: fontColor
  }
});

export default RegularText;