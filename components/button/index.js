import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { 
  fontColor, fontFamily, clearButtonTextColor, 
  regularButtonBackgroundColor, regularButtonTextColor  
} from '../../constants/styles';

import { getWidthSizeForScreen } from '../../constants/layout';

class StyledButton extends Component {
  getStyles() {
    let viewStyle;
    let textStyle;
    if (this.props.clear) {
      viewStyle = [styles.buttonView, styles.clearButtonView];
      textStyle = [styles.buttonText, styles.clearButtonText];
    } else {
      viewStyle = [styles.buttonView, styles.regularButtonView];
      textStyle = [styles.buttonText, styles.regularButtonText];
    }
    return { viewStyle, textStyle };
  }

  render() {
    const styles = this.getStyles();
    return (
      <TouchableHighlight 
        style={styles.viewStyle} 
        underlayColor={this.props.clear ? 'white' : '#0e4a71'}
        onPress={this.props.click}>
        <Text 
          style={[...styles.textStyle, this.props.style]}>
        {this.props.title}
        </Text>
      </TouchableHighlight>
    )
  }
};

const styles = StyleSheet.create({
  buttonView: {
    alignItems: 'center',
    marginHorizontal: getWidthSizeForScreen(50, 55, 60),
  },
  buttonText: {
    fontFamily,
    fontSize: getWidthSizeForScreen(13, 14, 16),
  },
  regularButtonView: {
    paddingVertical: getWidthSizeForScreen(10, 12, 15),
    backgroundColor: regularButtonBackgroundColor
  },
  regularButtonText: {
    color: regularButtonTextColor,
  },
  clearButtonView: {
    paddingVertical: 0,
    backgroundColor: 'white',
  },
  clearButtonText: {
    color: clearButtonTextColor,
  },
});

export default StyledButton;