import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import StyledButton from '../button';
import StyledText from '../text/styled-text';
// import AppForm from '../form';
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
    this.setState({ renderForm: false, renderChart: true });
  }
  
  handleTryAgainClick() {
    this.setState({ renderForm: true, renderChart: false });
  }

  handleChangePortfolioClick() {
    this.setState({ renderForm: true, renderChart: false});
  }
  
  renderCompareButton() {
    return (
      <View style={viewStyles.buttonContainer}>
      <StyledButton
      title='Compare Your Portfolio'
      click={this.handleCompareButtonClick.bind(this)}
      style={{ fontSize: 12 }} />
      </View>
    );
  }
  
  renderTryAgainButton() {
    return (
      <View>
      <StyledButton
      title="No Investments Found. Try Again"
      click={this.handleTryAgainClick.bind(this)} 
      />
      </View>
    )
  }
  
  renderPortfolioForm() {
    console.log('here in render form');
    return (
      <View>
      <StyledText
        text="Please tell us your investments in USD"
        style={{ fontWeight: 'bold' }}
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
          title="Change Portfolio"
          click={this.handleChangePortfolioClick.bind(this)}
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
  buttonContainer: {
    flex:1
  }
}

const mapStateToProps = (state) => {
  const { investmentTypes, userPortfolioTotal, userPortfolio } = state;
  return { investmentTypes, userPortfolioTotal, userPortfolio };
};

export default connect(mapStateToProps)(UserPortfolio);