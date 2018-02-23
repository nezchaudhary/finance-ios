import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontColor } from '../../styles/main';

class BoldText extends Component {
  render() {
    return (
      <Text style={style.text}>
        {this.props.text}
      </Text>
    )
  }
}

const style = StyleSheet.create({
  text: {
    color: fontColor,
    fontWeight: 'bold'
  }
});

export default BoldText;