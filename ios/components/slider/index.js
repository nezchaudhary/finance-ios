import React, { Component } from 'react';
import Slider from 'react-native-slider';
import { sliderColors } from '../../constants/styles';

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