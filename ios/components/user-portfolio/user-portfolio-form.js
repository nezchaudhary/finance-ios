import React, { Component } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
      let value = this.props.userPortfolio ? this.props.userPortfolio[type.name] : '';
      this.state[type.name] = `$${value ? value : ''}`;
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
      <View style={viewStyles.formBody}>
          {this.createInputFields()}
          <View style={viewStyles.showPortfolioButtonView}>
              <StyledButton 
                ref='form'
                title='Show Portfolio' 
                click={this.handleSubmit.bind(this)} 
              />
            </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { investmentTypes, userPortfolio } = state;
  return { investmentTypes, userPortfolio };
};
   
const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateUserPortfolio, updateUserPortfolioTotal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolioForm);

const viewStyles = StyleSheet.create({
  formBody: {
    marginTop: '5%',
    marginHorizontal: '15%',
  },
  formRowView: {
    alignItems: 'flex-start',
    marginBottom: '3%',
  },
  showPortfolioButtonView: {
    marginVertical: '8%',
    marginHorizontal: '-5%',
  },
});

const textStyles = StyleSheet.create({
  formRowLabel: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: '2%',
  },  
  formRowValue: {
    padding: '1%',
    borderWidth: 0.5,
    borderColor: borderColor,
    color: fontColor,
    width: getWidthSizeForScreen(175, 200, 225),
    height: getWidthSizeForScreen(22, 24, 28),
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowRadius: -2,
    // shadowColor: '#bfbfbf',
    // shadowOpacity: 0.2,
  }
});
