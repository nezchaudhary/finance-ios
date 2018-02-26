import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import StyledButton from '../button';
import StyledText from '../text/styled-text';
import DoughnutChart from '../charts/doughnut-chart'
import UserPortfolioForm from './user-portfolio-form';

class UserPortfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      renderCompareButton: true,
      renderForm: false,
      renderChart: false
    }
  }

  handleCompareButtonClick() {
    this.setState({ renderCompareButton: false, renderForm: true });
  }
  
  handleFormSubmit() {
    this.props.portfolioChange(true);
    this.setState({ renderForm: false, renderChart: true });
  }
  
  handleTryAgainClick() {
    this.setState({ renderForm: true, renderChart: false });
  }

  handleChangePortfolioClick() {
    this.props.portfolioChange(false);
    this.setState({ renderForm: true, renderChart: false});
  }
  
  renderCompareButton() {
    return (
      <View style={viewStyles.compareButtonView}>
      <StyledButton
        title='Compare Your Portfolio'
        click={this.handleCompareButtonClick.bind(this)}
      />
      </View>
    );
  }
  
  renderTryAgainButton() {
    return (
      <StyledButton
          title={`No Investments Found ${'\n'}          Try Again?`}     
      click={this.handleTryAgainClick.bind(this)} 
      clear={true}
      />
    )
  }
  
  renderPortfolioForm() {
    return (
      <View style={viewStyles.formContainer}>
        <StyledText
          text="Please tell us your investments in USD"
          style={textStyles.formTitle}
        />
        <UserPortfolioForm 
          submit={this.handleFormSubmit.bind(this)} 
        />
      </View>
    )
  }

  renderUserChart() {
    return (
      <View>
        <DoughnutChart type='user-portfolio'/>
        <StyledButton
          title="Edit Portfolio"
          click={this.handleChangePortfolioClick.bind(this)}
          clear={true}
          style={viewStyles.changeButton}
          />
      </View>
    );
  }
  
  render() {
    if (this.state.renderCompareButton) {
      return this.renderCompareButton();
    } else if (!this.state.renderCompareButton && this.state.renderForm) {
      return this.renderPortfolioForm();
    } else if (this.props.userPortfolio && !this.props.userPortfolioTotal) {
      return this.renderTryAgainButton();
    } else if (this.state.renderChart && this.props.userPortfolio && this.props.userPortfolioTotal) {
      return this.renderUserChart();
    }
  }
}

const viewStyles = {
  formContainer: {
    alignItems: 'center'
  },
  compareButtonView: {
    marginHorizontal: '18%',
  },
  changeButton: {
    marginTop: '1%',
  },
}

const textStyles = StyleSheet.create({
  formTitle: {
    fontWeight: 'bold',
  }
})

const mapStateToProps = (state) => {
  const { investmentTypes, userPortfolioTotal, userPortfolio } = state;
  return { investmentTypes, userPortfolioTotal, userPortfolio };
};

export default connect(mapStateToProps)(UserPortfolio);

// <StyledButton
//   title="Try Again?"
//   click={this.handleTryAgainClick.bind(this)}
//   clear={true}
// />