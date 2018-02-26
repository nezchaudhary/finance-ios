import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppSlider from '../slider/';
import StyledText from '../styled-components/text/styled-text';
import { updateRiskLevel } from '../../actions/update-risk-level';
import { getWidthSizeForScreen } from '../../constants/layout';

class RiskLevels extends Component {

  componentWillMount() {
    this.props.updateRiskLevel(1);
  }

  renderSliderInputValues(number, text) {
    return (
      <View style={viewStyles.riskTypeView}>
        <StyledText style={textStyles.riskTypeNumber} text={number} />
        <StyledText style={textStyles.riskTypeText} text={text} />
      </View>
    )
  }

  render() {
    return (
      <View>
        <View style={viewStyles.mainContainer}>
         {this.renderSliderInputValues(1, 'Low')}
          <View style={viewStyles.sliderContainer}>
            <AppSlider 
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={this.props.riskLevel} 
              onValueChange={this.props.updateRiskLevel} 
            />
          </View>
          {this.renderSliderInputValues(10, 'High')}
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

const viewStyles = StyleSheet.create({
  // top level container for component
  mainContainer: { 
    marginTop: '1.5%',
    flexDirection: 'row',
  },
  // views for number 1 and 10
  riskTypeView: { 
    flex: 1.5,
    marginTop: 5,
    alignItems: 'center',
  },
   // slider container
  sliderContainer: { 
    flex: 6,
  },
  // current risk level container
  riskLevelIndicator: { 
    alignItems: 'center',
  }  
});

const textStyles = StyleSheet.create({
  // text style for current risk level
  riskLevel: { 
    marginTop: -8,
    fontSize: getWidthSizeForScreen(12, 13.5, 14),
  },
  // text style for Low/High
  riskTypeText: { 
    fontSize: getWidthSizeForScreen(11, 12.5, 13.5),
  },
  // text style for number 1/10
  riskTypeNumber: { 
    fontWeight: 'bold',
  },
})

const mapStateToProps = (state) => ({ riskLevel: state.riskLevel });
const mapDispatchToProps = (dispatch) => bindActionCreators({ updateRiskLevel }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RiskLevels);