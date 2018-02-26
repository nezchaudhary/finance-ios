import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { 
  fontColor, fontFamily, clearButtonTextColor, 
  regularButtonBackgroundColor, regularButtonTextColor  
} from '../../constants/styles';

import { getWidthSizeForScreen } from '../../constants/layout';

export default class StyledButton extends Component {
  constructor() {
    super();
    this.state = {
      pressed: false
    }
  }

  onClickUnderLineClearText() {
    this.setState({ pressed: true });
  }

  onHideRemoveUnderLineForClearText() {
    this.setState({ pressed: false });
  }

  getStyles() {
    let viewStyle;
    let textStyle;
    if (this.props.clear) {
      viewStyle = [styles.buttonView, styles.clearButtonView];
      textStyle = [
        styles.buttonText,
        styles.clearButtonText,
        this.state.pressed ? styles.clearButtonTextPressed : null
      ];
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
        onShowUnderlay= {this.props.clear ? this.onClickUnderLineClearText.bind(this) : null}
        onHideUnderlay={this.props.clear ? this.onHideRemoveUnderLineForClearText.bind(this) : null}
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
  // all buttons view
  buttonView: {
    alignItems: 'center',
  },
  // all buttons text style
  buttonText: {
    fontFamily,
    fontSize: getWidthSizeForScreen(13, 15, 16),
  },
  // regular button view style
  regularButtonView: {
    paddingVertical: '5%',
    paddingHorizontal: 0,
    backgroundColor: regularButtonBackgroundColor,
    borderRadius: 2,
  },
  // regular button text style
  regularButtonText: {
    color: regularButtonTextColor,
  },
  // clear button view style
  clearButtonView: {
    paddingVertical: 0,
    backgroundColor: 'white',
  },
  // clear button text style
  clearButtonText: {
    color: clearButtonTextColor,
    fontWeight: 'bold',
  },
  // clear button pressed style
  clearButtonTextPressed: {
    textDecorationLine: 'underline',
  },
});