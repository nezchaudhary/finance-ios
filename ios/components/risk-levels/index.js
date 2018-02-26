import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppSlider from '../slider/';
import StyledText from '../text/styled-text';
import { sliderStyles } from '../../constants/styles';
import { updateRiskLevel } from '../../actions/update-risk-level';
import { getWidthSizeForScreen } from '../../constants/layout';

class RiskLevels extends Component {

  componentWillMount() {
    this.props.updateRiskLevel(1);
  }

  render() {
    return (
      <View>
        <View style={viewStyles.mainContainer}>
          <View style={viewStyles.riskType}>
            <StyledText style={textStyles.riskTypeNumber} text={'1'} />
            <StyledText style={textStyles.riskTypeText} text={'Low'} />
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
            <StyledText style={textStyles.riskTypeNumber} text={'10'} />
            <StyledText style={textStyles.riskTypeText} text={'High'} />
          </View>
        </View>
        <View style={viewStyles.riskLevelIndicator}>
          <StyledText
            style={textStyles.riskLevel}
            text={`Risk Level: ${this.props.riskLevel}`}
          />
        </View>
      </View>
    );
  }
}

const trackStyle = { // slider track style
  height: 8,
  borderRadius: 5,
  backgroundColor: '#d0d0d0',
};

const thumbStyle = { // slider thumb style
  width: 10,
  height: 20,
  borderRadius: 5,
  backgroundColor: '#5195cc',
}

const viewStyles = StyleSheet.create({
  mainContainer: { // top level container for component
    marginTop: '1.5%',
    flexDirection: 'row',
  },
  riskType: { // views for number 1 and 10
    flex: 1.5,
    marginTop: 5,
    alignItems: 'center',
  },
  sliderContainer: {  // slider container
    flex: 6,
  },
  riskLevelIndicator: { // current risk level container
    alignItems: 'center',
  }  
});

const textStyles = StyleSheet.create({
  riskLevel: { // text style for current risk level
    marginTop: -8,
    fontSize: getWidthSizeForScreen(12, 13.5, 14),
  },
  riskTypeText: { // text style for Low/High
    fontSize: getWidthSizeForScreen(11, 12.5, 13),
  },
  riskTypeNumber: { // text style for number 1/10
    fontWeight: 'bold',
  },
})

const mapStateToProps = (state) => ({ riskLevel: state.riskLevel });
const mapDispatchToProps = (dispatch) => bindActionCreators({ updateRiskLevel }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RiskLevels);