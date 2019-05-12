import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Button} from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConverted: false,
      exchangeRate: 0,
      totalConvertedAmount: 0,
      amountToConvert: 0,
      currencyTypeToConvert: '',
      currencyType: '',
    };
    this.onConvertClickHandler = this.onConvertClickHandler.bind(this);
  }
  onConvertClickHandler(){
    var currencyType = 'USD';
    var currencyTypeToConvert = 'CAD';
    var amountToConvert = 100;
    fetch('https://api.exchangeratesapi.io/latest?base='+currencyType)
            .then(res => res.json())
            .then(json => {
              if(json.base == currencyType){
                var exchangeRate = json.rates[currencyTypeToConvert];
                var totalConvertedAmount = amountToConvert * exchangeRate;
                this.setState({
                  isConverted: true,
                  exchangeRate: exchangeRate,
                  totalConvertedAmount: totalConvertedAmount,
                  amountToConvert: amountToConvert,
                  currencyTypeToConvert: currencyTypeToConvert,
                  currencyType: currencyType,
                });
              }
              else{
                this.setState({

                });
              }
            });

    //this.setState({isConverted: true,});
  }
  componentDidMount(){
    document.title = document.title + " : Home"
  }
  render() {
    const {
      isConverted,
      exchangeRate,
      totalConvertedAmount,
      amountToConvert,
      currencyTypeToConvert,
      currencyType,
    } = this.state;
    return (
      <div>
        <Button variant="primary" onClick={this.onConvertClickHandler}>
              Convert
        </Button>
        {
          isConverted
          ?
          <div>
          <h1>Converted</h1>
          <p>Conversion from {currencyType} to {currencyTypeToConvert}</p>
          <p>Total converted amount is {totalConvertedAmount} from {amountToConvert}.</p>
          <p>Exchange rate is {exchangeRate}</p>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default Home;
