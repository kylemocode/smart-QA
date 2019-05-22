import React, { Component } from 'react'
import New_Button from './New_Button';
import './Body.css';
import Item from './Item';

export default class Body extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    }
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem() {
    const items = this.state.itemList ? this.state.itemList : []
    const index = items.findIndex((data) => data.key == items.length); //check Item's key repeat
    items.push(
      <Item
        key={index <0 ? items.length : `${items.length}${index}`}
        deleteItem={this.deleteItem}
        keyId={index <0 ? items.length : `${items.length}${index}`}
      />
    )
    this.setState({itemList: items})
  }

  deleteItem(i) {
    const newItems = this.state.itemList;
    const index = newItems.findIndex((data) => data.props.keyId == i);
    newItems.splice(index,1);
    this.setState({itemList: newItems});
  }



  render() {
    const {itemList } = this.state;
    return (
      <div className="body">
        <New_Button count={itemList ? itemList.length : 0} addItem={this.addItem} />
        <div style={{width: '100%'}}>
          {itemList}
        </div>
      </div>
    )
  }

}



