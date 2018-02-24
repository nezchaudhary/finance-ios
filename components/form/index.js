import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StyledButton from '../button';
import tComb from 'tcomb-form-native';

const Form = tComb.form.Form;
const options = {}; // optional rendering options (see documentation)

class AppForm extends Component {

  createForm(list) {
    return list.reduce((result, type) => {
      result[type] = tComb.maybe(tComb.String);
      return result;
    }, {});
  }

  handleSubmit() {
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={this.createForm(this.props.list)}
          options={options}
        />
        <StyledButton title='Show Portfolio' onPress={this.handleSubmit.bind(this)} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ investmentTypes: state.investmentTypes});
export default connect(mapStateToProps)(AppForm);

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
