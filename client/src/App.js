import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Container, Row, Col} from 'reactstrap'
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
      price: []
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

  async componentDidMount() {
    let from = 'BTC';
    let to = 'USD';
    const newArray = [].concat(this.state.price);
    
    // getPrice(from, to)
    //   .then(results => {
    //     newArray.push(results);
    //   });
    
    // this.setState({ price: newArray }, () => console.log(this.state.price));

    await getPrice(from, to)
      .then(results => {
        newArray.push(results);
        this.setState({price: newArray}, () => console.log(this.state.price));
      });
    
  }
  
  render() {
    const data = this.state;
    return (
      <Container fluid={true}>
        {data.price.map((value) => (
          <p key={value.USD}>{value.USD}</p>
        ))}
        <Row>
          <Col xs="6" sm="6" md="9"></Col>
          <Col xs="6" sm="6" md="3">
            <WatchList />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
