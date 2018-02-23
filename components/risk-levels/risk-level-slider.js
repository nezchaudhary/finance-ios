import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Slider from 'react-native-slider';
import { updateRiskLevel } from '../../actions/update-risk-level';

class RiskLevelsSlider extends React.Component {

  componentDidMount() {
    this.props.updateRiskLevel(1);
  }
  
  render() {
    return (
      <Slider
        minimumValue={1}
        maximumValue={10}
        minimumTrackTintColor='#d9d9d9'
        maximumTrackTintColor='#d9d9d9'
        thumbTintColor='#5195cc'
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
        value={this.props.riskLevel}
        step={1}
        onValueChange={this.props.updateRiskLevel}
      />
    );
  }
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 5,
    backgroundColor: '#d0d0d0',
  },
  thumb: {
    width: 10,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#5195cc',
  }
});

const mapStateToProps = (state) => ({ riskLevel: state.riskLevel });
const mapDispatchToProps = (dispatch) => bindActionCreators({ updateRiskLevel }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RiskLevelsSlider);