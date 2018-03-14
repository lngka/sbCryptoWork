import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {getPrice, ifExist, Indicators} from './Api/cryptoApi';
// fetch('/p?from=BTC&to=USD')
//     .then(response => {
//         return response.text();
//     })
//     .then(text => {
//         console.log(text);
//     });

class App extends Component {
  constructor(props) {
    super(props);
    let from = 'BTC';
    let to = 'USD';
    let value = 'BTC';
    let type = 'rsi', params = 14, pair = ["BTC","USD"], timeframe = 1440;
    let price1 = getPrice(from, to)
      .then(results => {
        console.log("price: ", results);
      });
    
    let price2 = ifExist(value)
      .then(results => {
        console.log("exist: ", value);
      });

    let price3 = Indicators(type, params, pair, timeframe)
      .then(results => {
        console.log("Indicators", results);
      });
    
      this.state = {
        checkIndi: price3
      }
  }
  
  render() {
    return (
      <div className="App">
        {this.state.checkIndi}
      </div>
    );
  }
}

export default App;
