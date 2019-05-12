import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Button, Form, Col} from 'react-bootstrap';

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
    this.onTextBoxChangeCurrencyType = this.onTextBoxChangeCurrencyType.bind(this);
    this.onTextBoxChangeCurrencyTypeToConvert = this.onTextBoxChangeCurrencyTypeToConvert.bind(this);
    this.onTextBoxChangeAmoutToConvert = this.onTextBoxChangeAmoutToConvert.bind(this);
  }
  onTextBoxChangeCurrencyType(event){
    this.setState({
          currencyType: event.target.value,
        });
  }
  onTextBoxChangeCurrencyTypeToConvert(event){
    this.setState({
          currencyTypeToConvert: event.target.value,
        });
  }
  onTextBoxChangeAmoutToConvert(event){
    this.setState({
          amountToConvert: event.target.value,
        });
  }
  onConvertClickHandler(){
    const {
      isConverted,
      exchangeRate,
      totalConvertedAmount,
      amountToConvert,
      currencyTypeToConvert,
      currencyType,
    } = this.state;
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
                alert(json.error);
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
      <h1>Currency Exchage</h1>
      <Form>
        <Form.Row>
          <Col>
            <Form.Control placeholder="Currency Type" value={currencyType} onChange = {this.onTextBoxChangeCurrencyType} />
          </Col>
          <Col md="1.5">
          <Form.Label>To</Form.Label>
          </Col>
          <Col>
            <Form.Control placeholder="Currency type to convert" value={currencyTypeToConvert} onChange = {this.onTextBoxChangeCurrencyTypeToConvert}/>
          </Col>
          <Col>
          <Form.Control placeholder="Enter Currency" value={amountToConvert==0?"":amountToConvert} onChange = {this.onTextBoxChangeAmoutToConvert}/>
          </Col>

          <Col>
          <Button variant="primary" onClick={this.onConvertClickHandler}>
                Convert
          </Button>
          </Col>
        </Form.Row>
    </Form>

        {
          isConverted
          ?
          <div>
          <h1>Converted</h1>
          <p>Exchange rate: {exchangeRate}</p>
          <p>Converted amount: {totalConvertedAmount}</p>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default Home;
