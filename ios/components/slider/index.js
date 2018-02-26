import React, { Component } from 'react';
import Slider from 'react-native-slider';

export default class AppSlider extends Component {
  render() {
    return (
      <Slider {...this.props} />
    );
  }
}
