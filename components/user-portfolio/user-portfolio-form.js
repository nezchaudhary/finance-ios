import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StyledButton from '../button';
import StyledText from '../text/styled-text';
import { updateUserPortfolio } from '../../actions/update-user-portfolio';
import { updateUserPortfolioTotal } from '../../actions/update-user-portfolio-total';

class UserPortfolioForm extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
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
        <View key={field.name}>
          <StyledText 
            text={field.name}
            style={{ fontWeight: 'bold' }}
          />
          <TextInput
            onChangeText={(value => this.updateInput(field.name, value))}
            value={this.state[field.name]}
          />
        </View>
      );
    })
  }

  render() {
    return (
      <View style={styles.container}>
      {this.createInputFields()}
        <StyledButton 
          title='Show Portfolio' 
          click={this.handleSubmit.bind(this)} 
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ investmentTypes: state.investmentTypes });
const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateUserPortfolio, updateUserPortfolioTotal }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolioForm);

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  }
  // title: {
  //   fontSize: 30,
  //   alignSelf: 'center',
  //   marginBottom: 30
  // },
  // buttonText: {
  //   fontSize: 18,
  //   color: 'white',
  //   alignSelf: 'center'
  // },
  // button: {
  //   height: 36,
  //   backgroundColor: '#48BBEC',
  //   borderColor: '#48BBEC',
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   marginBottom: 10,
  //   alignSelf: 'stretch',
  //   justifyContent: 'center'
  // }
});