import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import RiskLevelsSlider from './risk-level-slider';
import BoldText from '../text/bold-text';
import RegularText from '../text/regular-text';

class RiskLevels extends React.Component {

  render() {
    return (
      <View>
        <View style={viewStyles.mainContainer}>
          <View style={viewStyles.riskType}>
            <BoldText text={'1'} />
            <RegularText text={'Low'} />
          </View>
          <View style={viewStyles.sliderContainer}>
            <RiskLevelsSlider />
          </View>
          <View style={viewStyles.riskType}>
            <BoldText text={'10'} />
            <RegularText text={'High'} />
          </View>
        </View>
        <View style={viewStyles.riskLevelIndicator}>
          <BoldText
            text={`Risk Level: ${this.props.riskLevel || '1'}`}
          />
        </View>
      </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  mainContainer: { // top level container for component
    marginTop: 40,
    flexDirection: 'row',
    flex: 0.80,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400
  },
  riskType: { // views for number 1 and 10
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sliderContainer: { 
    flex: 8,
    justifyContent: 'center',

  },
  riskLevelIndicator: {
    flex: 0.7,
    alignItems: 'center',
    // justifyContent: 'flex-start'
  }  
});

const mapStateToProps = (state) => ({ riskLevel: state.riskLevel });
export default connect(mapStateToProps)(RiskLevels);