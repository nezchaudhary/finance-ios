import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StyledButton from '../button';
import StyledText from '../text/styled-text';
import { updateUserPortfolio } from '../../actions/update-user-portfolio';
import { updateUserPortfolioTotal } from '../../actions/update-user-portfolio-total';
import { fontColor, borderColor } from '../../constants/styles';
import { getWidthSizeForScreen } from '../../constants/layout';
import { formatDollarString, removeCommas } from '../../utility/format-dollar-string';

class UserPortfolioForm extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    this.updateInputValues(this.props);
  }

  updateInputValues(props) {
    props.investmentTypes.map(type => {
      let value = props.userPortfolio ? props.userPortfolio[type.name] : '';
      this.state[type.name] = `$${value ? formatDollarString(value) : '' }`;
    });
  }

  updateInput(type, input) {
    let value = input[0] === '$' ? input.slice(1) : input.slice();
    value = removeCommas(value);
    this.setState({ [type]: `$${formatDollarString(value)}` });
  }

  handleSubmit() {
    let total = 0;
    const payload = {};
    for (let type in this.state) {
      let amount = (this.state[type]).slice(1);
      amount = removeCommas(amount);
      amount = Number(amount) || 0;
      total += amount
      payload[type] = amount > 0 ? amount : 0;
    }

    this.props.updateUserPortfolio(payload);
    this.props.updateUserPortfolioTotal(total);
    this.props.submit();
  }

  handleClearPortfolio() {
    const portfolio = {};
    for (let inv in this.props.investmentTypes) {
      portfolio[inv] = 0;
    }
    this.props.updateUserPortfolio(portfolio);
    this.props.updateUserPortfolioTotal(0);
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
            keyboardType='numeric'
            returnKeyType="done"
          />
        </View>
      );
    })
  }

  render() {
    return (
      <View style={viewStyles.formContainer}>
        <StyledText
          text="Please tell us your investments in USD"
          style={textStyles.formTitle}
        />
        <View style={viewStyles.formBody}>
          {this.createInputFields()}
          <View style={viewStyles.clearButtonView}>
            <StyledButton
              title='Clear'
              click={this.handleClearPortfolio.bind(this)}
              clear={true}
              style={textStyles.clearButtonText}
            />
          </View>
          <View style={viewStyles.compareButtonView}>
            <StyledButton 
              title='Compare My Portfolio' 
              click={this.handleSubmit.bind(this)} 
            />
          </View>
        </View>
      </View>
    );
  }
}


const viewStyles = StyleSheet.create({
  // top level component container
  formContainer: {
    alignItems: 'center'
  },
  // form body container
  formBody: {
    marginTop: '5%',
    marginHorizontal: '15%',
  },
  // form row container
  formRowView: {
    alignItems: 'flex-start',
    marginBottom: '3%',
  },
  // compare my portfolio button view
  compareButtonView: {
    marginVertical: '8%',
    marginHorizontal: '-5%',
  },
  // clear button view
  clearButtonView: {
    alignItems: 'flex-end',
  },
});

const textStyles = StyleSheet.create({
  // form title style
  formTitle: {
    fontWeight: 'bold',
  },
  // form row label text style
  formRowLabel: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: '2%',
  },
  // form row value text style
  formRowValue: {
    padding: '1%',
    borderWidth: 0.5,
    borderColor: borderColor,
    color: fontColor,
    width: getWidthSizeForScreen(175, 200, 225),
    height: getWidthSizeForScreen(22, 24, 28),
  },
  // clear button text style
  clearButtonText: {
    fontSize: getWidthSizeForScreen(11, 12, 13),
    fontWeight: 'normal',
  }
});

const mapStateToProps = (state) => {
  const { investmentTypes, userPortfolio } = state;
  return { investmentTypes, userPortfolio };
};
   
const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateUserPortfolio, updateUserPortfolioTotal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolioForm);