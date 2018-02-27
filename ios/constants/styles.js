import { getWidthSizeForScreen } from './layout';

// colors
const fontColor = '#5195cc';
const borderColor = '#e6e6e6';
const clearButtonTextColor = '#1779ba';
const regularButtonBackgroundColor = '#1779ba';
const regularButtonTextColor = '#fefefe';

// Slider colors
const sliderColors = {
  minTrackColor: '#d9d9d9',
  maxTrackColor: '#d9d9d9',
  thumbColor: '#5195cc',
};

const logoStyles = {
  investiColor: '#96e1f2',
  meColor: '#4b81aa',
  fontSize: getWidthSizeForScreen(22, 25, 30),
  borderBottomColor: '#e6e6e6',
};

// font family
const fontFamily = 'Trebuchet MS';

// font size for app
const fontSize = getWidthSizeForScreen(13, 15.25, 16);

export {
  sliderColors,
  logoStyles,
  fontColor,
  fontFamily,
  fontSize,
  borderColor,
  clearButtonTextColor,
  regularButtonBackgroundColor,
  regularButtonTextColor,
};