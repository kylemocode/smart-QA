import React, { Component } from 'react'
import New_Button from './New_Button';
import './Body.css';
import Item from './Item';

export default class Body extends Component {

  constructor(props) {
    super(props);
    this.state = {
        count: 0,
        itemList: []
    }
    this.addItem = this.addItem.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
  }

  addItem() {
    this.setState({
        count: ++this.state.count,
        itemList: this.state.itemList.concat(this.state.count)
    })
  }

//   deleteItem(id) {
//     this.setState({
//         itemList: this.state.itemList.filter((item) => {
//             return item.key !== id
//         })
        
//     })
//     console.log(id)
// }

  render() {
        const { count,itemList } = this.state;
        return (
          <div className="body">
            <New_Button count={count} addItem={this.addItem}/>
            { itemList.map((item,i) => {
                return <Item key={i} deleteItem={() => { console.log('test')}} keyId={i}/>  //deleteItem={this.deleteItem(i)}
            })}
          </div>
        )
      }
  }

  

