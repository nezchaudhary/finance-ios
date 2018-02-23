import React from 'react';
import Slider from 'react-native-slider';

export default class AppSlider extends React.Component {
  render() {
    return (
      <Slider {...this.props} />
    );
  }
}
