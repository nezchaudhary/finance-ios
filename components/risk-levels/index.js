import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppSlider from '../slider/';
import StyledText from '../text/styled-text';
import { sliderStyles } from '../../constants/styles';
import { updateRiskLevel } from '../../actions/update-risk-level';
import { getWidthSizeForScreen } from '../../constants/layout';

class RiskLevels extends React.Component {

  componentWillMount() {
    this.props.updateRiskLevel(1);
  }

  render() {
    return (
      <View>
        <View style={viewStyles.mainContainer}>
          <View style={viewStyles.riskType}>
            <StyledText stye={{ fontWeight: 'bold' }} text={'1'} />
            <StyledText text={'Low'} />
          </View>
          <View style={viewStyles.sliderContainer}>
            <AppSlider 
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor={sliderStyles.minTrackColor}
              maximumTrackTintColor={sliderStyles.maxTrackColor}
              thumbTintColor={sliderStyles.thumbColor}
              trackStyle={trackStyle}
              thumbStyle={thumbStyle}
              value={this.props.riskLevel} 
              onValueChange={this.props.updateRiskLevel} 
            />
          </View>
          <View style={viewStyles.riskType}>
            <StyledText 
              stye={{ fontWeight: 'bold'}} 
              text={'10'} />
            <StyledText text={'High'} />
          </View>
        </View>
        <View style={viewStyles.riskLevelIndicator}>
          <StyledText
            style={{ fontWeight: 'bold' }}
            text={`Risk Level: ${this.props.riskLevel}`}
          />
        </View>
      </View>
    );
  }
}

const trackStyle = {
  height: 8,
  borderRadius: 5,
  backgroundColor: '#d0d0d0',
};

const thumbStyle = {
  width: 10,
  height: 20,
  borderRadius: 5,
  backgroundColor: '#5195cc',
}

const viewStyles = StyleSheet.create({
  mainContainer: { // top level container for component
    marginTop: 40,
    flexDirection: 'row',
    flex: 0.80,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWidthSizeForScreen(300, 350, 400)
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ updateRiskLevel }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RiskLevels);