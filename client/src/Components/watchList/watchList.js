import React from 'react';
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import { ifExist, getPrice } from '../../Api/cryptoApi';
import WatchListItem from './watchList_item';

export default class WatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      currency: [
        "USD",
        "EUR",
        "VND",
        "GBP",
        "JPY",
        "CNY",
        "AUD",
        "SGD"
      ],
      from: '',
      to: 'USD',
      dataRender: {
        isFrom: '',
        isTo: ''
      },
      price: [],
      isReal: false
    };

    this.toggle = this.toggle.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.currencyChange = this.currencyChange.bind(this);
    this.save = this.save.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  typeChange(e) {
    let value = e.target.value;
    let newValue = value.toUpperCase()
    this.setState({
      from: newValue
    });
  }

  currencyChange(e) {
    this.setState({
      to: e.target.value
    });
  }

  async save(e) {
    let value = this.state.from

    if(value !== '') {
      await ifExist(value)
        .then(results => {
          if(results === 1) {
            this.setState({
              isReal: true
            })
          }
        });
    }

    if(this.state.isReal === true) {
      let valueFrom = this.state.from;
      let valueTo = this.state.to;
      let newValue = {};
      const newArray = this.state.price.slice();
      // let newArray = [].concat(this.state.price);
      // this.setState({
      //   dataRender: {
      //     isFrom: valueFrom,
      //     isTo: valueTo
      //   },
      //   modal: !this.state.modal
      // }, () => console.log(this.state.dataRender));

      await getPrice(valueFrom, valueTo)
        .then(results => {
          console.log(results);
          newValue = results;
        });
      newArray.push(newValue);
      this.setState({
        price: newArray
      })

      // await getPrice(valueFrom, valueTo) 
      //   .then(results => {
      //     newValue = `<ListGroupItem tag="button" action key=${results[this.valueTo]}>${results[this.valueTo]}</ListGroupItem>`;
      //   });
      //   newArray.push(newValue);
      //   this.setState({
      //     price: newArray
      //   })
    } 

    this.setState({
      modal: false
    });
  }

  

  render() {
    return (
      <div>
        <Button outline color="success" onClick={this.toggle}>Add new</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label for="type">Currency Type</Label>
              <Input type="text" name="type" value={this.state.from} id="type" placeholder="Currency type..." onChange={(e) => this.typeChange(e)}/>
            </FormGroup>
            <FormGroup>
            <Label for="exampleSelect">Select</Label>
              <Input type="select" name="select" value={this.state.to} id="exampleSelect" onChange={(e) => this.currencyChange(e)}>
                {this.state.currency.map((value) => (
                  <option value={value} key={value}>{value}</option>
                ))}
              </Input>
            </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle} onClick={e => this.save(e)}>Add This Pair</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        <ListGroup>
          {this.state.price.map((value, index) => (
            <ListGroupItem tag="button" action key={value[Object.getOwnPropertyNames(value)]}>{value[Object.getOwnPropertyNames(value)]}</ListGroupItem>
          ))}
        </ListGroup>        
      </div>
    );
  }
}