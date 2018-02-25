import React, { Component } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import StyledButton from '../button';
import StyledText from '../text/styled-text';
import { updateUserPortfolio } from '../../actions/update-user-portfolio';
import { updateUserPortfolioTotal } from '../../actions/update-user-portfolio-total';
import { fontColor, borderColor, onFocusBorderColor } from '../../constants/styles';
import { getWidthSizeForScreen } from '../../constants/layout';

class UserPortfolioForm extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    this.props.investmentTypes.map(type => {
      this.state[type.name] = '$';
    });
  }

  updateInput(type, input) {
    const value = input[0] === '$' ? input.slice(1) : input;
    this.setState({ [type]: `$${value}` });
  }

  handleSubmit() {
    let total = 0;
    const payload = {};
    for (let type in this.state) {
      let amount = (this.state[type]).slice(1);
      amount = Number(amount) || 0;
      total += amount
      payload[type] = amount > 0 ? amount : 0;
    }

    this.props.updateUserPortfolio(payload);
    this.props.updateUserPortfolioTotal(total);
    this.props.submit();
  }

  createInputFields() {
    return this.props.investmentTypes.map(field => {
      return (
        <View style={viewStyles.formRowView} key={field.name}>
          <StyledText 
            text={`${field.name}:`}
            style={textStyles.formRowLabel}
          />
          <TextInput
            onChangeText={(value => this.updateInput(field.name, value))}
            value={this.state[field.name]}
            style={textStyles.formRowValue}
          />
        </View>
      );
    })
  }

  render() {
    return (
      // <KeyboardAwareScrollView
        // resetScrollToCoords={{ x: 0, y: 0 }}
        // scrollEnabled={false}
      // >
        <View style={viewStyles.formBody}>
            {this.createInputFields()}
              <StyledButton 
                title='Show Portfolio' 
                click={this.handleSubmit.bind(this)} 
              />
        </View>
      // </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => ({ investmentTypes: state.investmentTypes });
const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateUserPortfolio, updateUserPortfolioTotal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolioForm);

const viewStyles = StyleSheet.create({
  formBody: {
    marginTop: '5%',
    alignItems: 'flex-start',
    marginHorizontal: '15%',
  },
  formRowView: {
    marginBottom: '3%',
  }
});

const textStyles = StyleSheet.create({
  formRowLabel: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: '2%',
  },
  formRowValue: {
    padding: '1%',
    borderWidth: 1,
    borderColor: borderColor,
    color: fontColor,
    width: 175,
  }
})



  // resetScrollToCoords={{ x: 0, y: 0 }}
        // scrollEnabled={false}