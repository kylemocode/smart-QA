import React, { Component } from 'react'
import New_Button from './New_Button';
import './Body.css';
import Item from './Item';
import axios from 'axios';
import { intentList } from '../../apiurl'
import Modal from 'react-modal';

export default class Body extends Component {

  constructor(props) {
    super(props);

    const {
      ofelId
    } = this.props;


    this.state = {
      itemList: [],
      isPopupOpen: false
    }
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    let dataList = [];
    // console.log(this.props.ofelId)
    axios.get(intentList,{headers: {'ofelId': '888'}})
      .then((res) => res.data.data.reverse().map(qaItem => {
        dataList.push(<Item 
                        key={qaItem.id}
                        deleteItem={this.deleteItem}
                        keyId={qaItem.id}
                        uuid={qaItem.uuid}
                        enable={qaItem.enable}
                        keywords={qaItem.keywords}
                        replys={qaItem.replys}
                        isCreated={true}
                        ofelId={this.props.ofelId}
                        fetchApi={this.fetchApi}/>)
      }))
      .then(() => this.setState(() => ({
        itemList: dataList
      })))
      // .then(() => console.log(this.props.ofelId))
    }
  handlePopupOpen = () => {
    this.setState({
      isPopupOpen: true
    })
  }

  handlePopupClose = () => {
    this.setState({
      isPopupOpen: false
    })
  }
  addItem() {
    const items = this.state.itemList ? this.state.itemList : []
    const index = items.findIndex((data) => data.key == items.length); //check Item's key repeat
    if(items.length == this.props.intentQuota) {
      this.handlePopupOpen();
    }else{
      items.unshift(
        <Item
          key={index <0 ? items.length : `${items.length}${index}`}
          deleteItem={this.deleteItem}
          keyId={index <0 ? items.length : `${items.length}${index}`}
          keywords=""
          fetchApi={this.fetchApi}
          enable={true}
          forceReveal={true}
        />
      )
      this.setState({itemList: items})
    }
  }

  deleteItem(i) {
    const newItems = this.state.itemList;
    const index = newItems.findIndex((data) => data.props.keyId == i);
    newItems.splice(index,1);
    this.setState({itemList: newItems});
  }

  fetchApi = () => {
    let dataList = [];
    // console.log(this.props.ofelId)
    axios.get(intentList,{headers: {'ofelId': '888'}})
      .then((res) => res.data.data.reverse().map(qaItem => {
        dataList.push(<Item 
                        key={qaItem.id}
                        deleteItem={this.deleteItem}
                        keyId={qaItem.id}
                        uuid={qaItem.uuid}
                        enable={qaItem.enable}
                        keywords={qaItem.keywords}
                        replys={qaItem.replys}
                        isCreated={true}
                        ofelId={this.props.ofelId}
                        fetchApi={this.fetchApi}/>)
      }))
      .then(() => this.setState(() => ({
        itemList: dataList
      })))
  }


  render() {
    
    return (
      <div className="body">
        <New_Button 
          count={this.state.itemList ? this.state.itemList.length : 0} 
          addItem={this.addItem} 
          intentQuota={this.props.intentQuota} 
          isPopupOpen={this.state.isPopupOpen} 
          handlePopupOpen={this.handlePopupOpen} 
          handlePopupClose={this.handlePopupClose}/>
        <div style={{width: '100%'}}>
          {this.state.itemList}
        </div>
      </div>
    )
  }

}



