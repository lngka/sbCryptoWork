import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { getPrice } from '../../Api/cryptoApi';

export default class WatchListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thisData: this.props.onRender,
      price: []
    }
  }

  async componentDidMount() {
    let from = this.state.thisData.isFrom;
    let to = this.state.thisData.isTo;
    let newArray = [].concat(this.state.price);
    if(this.state.thisData.isFrom !== '') {
      await getPrice(from, to) 
      .then(results => {
        newArray.push(results);
        this.setState({price: newArray}, () => console.log(this.state.price));
      });
    }
    
  }

  render() {
    const data = this.state;
    return (
        <ListGroup>
          {data.price.map((value) => (
            <ListGroupItem tag="button" action key={value[data.thisData.isFrom]}>{value[data.thisData.isFrom]}</ListGroupItem>
          ))}
        </ListGroup>
    );
  }
}