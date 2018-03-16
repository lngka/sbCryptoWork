import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Container, Row, Col, Badge} from 'reactstrap'
import WatchList from './Components/watchList/watchList';
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
    
    this.state = {
      data: {}
    }
    // let value = 'BTC';
    // let type = 'rsi', params = 14, pair = ["BTC","USD"], timeframe = 1440;
    
    // let price2 = ifExist(value)
    //   .then(results => {
    //     console.log("exist: ", results);
    //   });

    // let price3 = Indicators(type, params, pair, timeframe)
    //   .then(results => {
    //     console.log("Indicators", results);
    //   });
    
      
  }

  onLoad(thRow) {
    
    this.setState({
      data: thRow
    });
  }

  // async componentDidMount() {
  //   let from = 'BTC';
  //   let to = 'USD';
  //   const newArray = [].concat(this.state.price);
    
  //   // getPrice(from, to)
  //   //   .then(results => {
  //   //     newArray.push(results);
  //   //   });
    
  //   // this.setState({ price: newArray }, () => console.log(this.state.price));

  //   await getPrice(from, to)
  //     .then(results => {
  //       newArray.push(results);
  //       this.setState({price: newArray}, () => console.log(this.state.price));
  //     });
    
  // }
  
  render() {
    const data = this.state;
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="6" sm="6" md="9">
            <h3><Badge color="primary">{this.state.data.value}</Badge></h3>
          </Col>
          <Col xs="6" sm="6" md="3">
            <WatchList onLoad = {thRow => this.onLoad(thRow)} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
