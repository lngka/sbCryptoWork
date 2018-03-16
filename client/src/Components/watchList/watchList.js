import React from 'react';
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
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

  onLoad(value) {
    this.props.onLoad(value);
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.getElementById('alertMessage');
    div.innerHTML =`<div class="alert alert-${className}" role="alert">${message}</div>`;
    
    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if(currentAlert) {
      currentAlert.remove();
    }
  }

  onDelete(value) {
    const newArray = [].concat(this.state.price);
    let index = newArray.findIndex(x => x.value === value.value);
    
    newArray.splice(index, 1);
    this.setState({
      from: '',
      to: 'USD',
      price: newArray
    });

    this.showAlert('Pair is deleted', 'success');
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
          let codeCurrency = `${valueFrom}/${valueTo}`;
          let value = results[Object.getOwnPropertyNames(results)];
          
          newValue = {
            value: value,
            codeCurrency: codeCurrency,
            renderBl: false
          }

          newArray.push(newValue);
        });
        let checkArr = newArray.map(item => item.value);
        let hasDuplicate = false;
        checkArr.sort().sort((a, b) => {
          if (a === b) hasDuplicate = true
        });
        
        if(hasDuplicate) {
          this.showAlert('This pair has already added', 'warning');
        } else {
          this.setState({
            price: newArray
          })
        }
     

      // await getPrice(valueFrom, valueTo) 
      //   .then(results => {
      //     newValue = `<ListGroupItem tag="button" action key=${results[this.valueTo]}>${results[this.valueTo]}</ListGroupItem>`;
      //   });
      //   newArray.push(newValue);
      //   this.setState({
      //     price: newArray
      //   })
    } else {
      this.showAlert('This currency code is not real!', 'danger');
      this.setState({
        modal: false,
        from: '',
        to: 'USD'
      });
    }

    this.setState({
      modal: false
    });
    e.persist();
  }

  render() {
    if (this.state.price === []) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <div id="alertMessage"></div>
        <Button outline color="success" onClick={this.toggle}>Add new</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add to Follow:</ModalHeader>
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
          {this.state.price.map((value) => (
            (value.value !== '') ? <ListGroupItem tag="a" action key={value.value} onClick = {this.onLoad.bind(this, value)}>{value.codeCurrency} <Button outline color="danger" onClick={this.onDelete.bind(this, value)}>X</Button></ListGroupItem> : ''
          ))}
        </ListGroup>        
      </div>
    );
  }
}