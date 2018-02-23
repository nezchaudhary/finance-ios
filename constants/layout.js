import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const window = {
  width,
  height
};

const getWidthSizeForScreen = (for5, for678, forPlus) => {
  if (window.width < 375) return for5;
  if (window.width > 375) return forPlus;
  return for678;
}

export {
  window,
  getWidthSizeForScreen
}