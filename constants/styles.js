import { getWidthSizeForScreen } from './layout';

const fontColor = '#5195cc';
const fontFamily = 'Trebuchet MS';
const paddingHorizontal = '2.5%';
const fontSize = getWidthSizeForScreen(13, 14, 16);

const sliderStyles = {
  minTrackColor: '#d9d9d9',
  maxTrackColor: '#d9d9d9',
  thumbColor: '#5195cc'
};

export {
  fontColor,
  fontFamily,
  sliderStyles,
  fontSize,
  paddingHorizontal
};