import React, { Component } from 'react';
import { View } from 'react-native';
import StyledText from '../../text/styled-text';

class DoughnutLegend extends Component {
  render() {
    return (
      <View>
        {this.props.data.labels.map((value, index) => {
          const style = { 'backgroundColor': `${this.props.data.colors[index]}` };
          return (
            <View key={value}>
              <StyledText style={style} />
              <StyledText style={{ color: '#737373' }} text={value} />
            </View>
          );
        })}
      </View>
    );
  }
}

export default DoughnutLegend;