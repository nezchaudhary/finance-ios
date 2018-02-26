import React, { Component } from 'react';
import Slider from 'react-native-slider';

export default class AppSlider extends Component {
  render() {
    return (
      <Slider 
        {...this.props}
        minimumTrackTintColor={sliderColors.minTrackColor}
        maximumTrackTintColor={sliderColors.maxTrackColor}
        thumbTintColor={sliderColors.thumbColor}
        trackStyle={trackStyle}
        thumbStyle={thumbStyle}
      />
    );
  }
}

// Slider colors
const sliderColors = {
  minTrackColor: '#d9d9d9',
  maxTrackColor: '#d9d9d9',
  thumbColor: '#5195cc'
};

// slider track style
const trackStyle = { 
  height: 8,
  borderRadius: 5,
  backgroundColor: '#d0d0d0',
};

// slider thumb style
const thumbStyle = { 
  width: 10,
  height: 20,
  borderRadius: 5,
  backgroundColor: '#5195cc',
};