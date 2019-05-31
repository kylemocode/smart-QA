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

  componentDidMount() {
    let dataList = [];
    // const ofelId = ""+this.props.ofelId
    
    fetch('https://ofel.ai/node/intent/list',{headers: {'ofelId': '222'}})
      .then((data) => data.json())
      .then((res) => res.data.map(qaItem => {
        dataList.push(<Item 
                        key={qaItem.id}
                        deleteItem={this.deleteItem}
                        keyId={qaItem.id}/>)
      }))
      .then(() => this.setState(() => ({
        itemList: dataList
      })))
      .then(() => console.log(this.props.ofelId))
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
    
    return (
      <div className="body">
        <New_Button count={this.state.itemList ? this.state.itemList.length : 0} addItem={this.addItem} intentQuota={this.props.intentQuota}/>
        <div style={{width: '100%'}}>
          {this.state.itemList}
        </div>
      </div>
    )
  }

}



