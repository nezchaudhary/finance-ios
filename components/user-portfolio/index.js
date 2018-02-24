import React from 'react';
import { View, Text } from 'react-native';

import StyledButton from '../button';


class UserPortfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      renderCompareButton: true,
      renderForm: false
    }
  }

  handleCompareButtonClick() {
    this.setState({ renderCompareButton: false, renderForm: true });
  }

  handleFormSubmit() {
    this.setState({ renderForm: false });
  }

  renderCompareButton() {
    if (!this.props.userPortfolioTotal) {
      return (
        <View style={viewStyles.buttonContainer}>
          <StyledButton
            title='Compare Your Portfolio'
            click={this.handleCompareButtonClick.bind(this)}
            style={{ fontSize: 12 }} />
        </View>
      );
    }
    return null;
  }

  renderTryAgainButton() {
    if (this.props.userPortfolio && !this.props.userPortfolioTotal) {
      return (
        <View>
          <StyledButton
            title="No Investments Found. Try Again"
            click={this.handleTryAgainClick} 
          />
        </View>
        )
      }
    }

  renderPortfolioForm() {
    if (this.state.renderForm) {
      return (
        <View>
          <AppForm submit={this.handleFormSubmit.bind(this)} list={this.props.investmentTypes} />
        </View>
      )
    }
    return null;
  }

  renderUserChart() {
    // if (this)
    if (this.props.userPortfolio && this.props.userPortfolioTotal) {
      return (
        <View>
          <DoughnutChart />
        </View>
      );
    }
  }
  
  render() {
    return this.renderCompareButton();
    // { this.renderTryAgainButton() }
    // { this.renderPortfolioForm() }
    // { this.renderUserChart() }
  }
}

const viewStyles = {
  buttonContainer: {
    flex:1
  }
}

export default UserPortfolio;