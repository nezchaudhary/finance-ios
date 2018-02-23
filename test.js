import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  render() {
    return (
      <View style={viewStyles.mainContainer}>
       {this.props.types.map(type => (<Text key={type.name}>{type.name}</Text>))}
      </View>
      
    );
  }
}

const viewStyles = StyleSheet.create({
  mainContainer: { // top level container
    flex: 1,
    alignItems: 'center',
    marginTop: 35,
  },
  logoContainer: { // main logo container
    flex: 0.75
  },
  headerContainer: { // main header container
    flex: 0.2
  },
  riskLevelsContainer: { // slider container
    flex: 1
  },
  chartsContainer: { // charts container
    flex: 8
  }
});

const textStyles = StyleSheet.create({
  logo: { // logo text 
    fontSize: 35
  },
  investiLogo: {
    color: '#96e1f2',
  },
  meLogo: {
    color: '#4b81aa',
  },
});

const mapStateToProps = (state) => ({ types: state.investmentTypes });
export default connect(mapStateToProps)(MainPage);
