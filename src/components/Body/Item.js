import React, { Component } from 'react'
import ToggleButton from './ToggleButton';


export default class Item extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isOpen: false,
          isReveal: false
      }

      this.handleOpen = this.handleOpen.bind(this);
      this.handleReveal = this.handleReveal.bind(this);
  }

  handleOpen() {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  handleReveal() {
      this.setState({
          isReveal: !this.state.isReveal
      })
  }

  render() {
    return (
      <div className="container item_container_flex">
        <div style={{width: '100%',marginRight: '20px'}}>
            <div>
                <div className="item_title" style={{backgroundColor: this.state.isOpen? '#1982D8': '#E0E0E0',transition:'0.3s'}}>
                    <p>按此編輯對話名稱</p>
                    <div style={{backgroundColor: this.state.isOpen? '#106fbc': '#D5D5D5',transition:'0.3s'}} onClick={this.handleReveal}>{this.state.isReveal? <i class="fas fa-chevron-up"></i>:<i class="fas fa-chevron-down"></i>}</div>
                </div>
                <div className="item_status">
                    <p>智能對話狀態: {this.state.isOpen ? '開啟':'關閉'}</p>
                    <ToggleButton style={{marginRight: '20px'}} handleOpen={this.handleOpen} isOpen={this.state.isOpen}/>
                </div>
            </div>
            
        </div>

        <div>
            <button className="cleanup_btn" onClick={() => this.props.deleteItem(this.props.keyId)}><i class="fas fa-trash-alt"></i></button>  
        </div>    
      </div>
    )
  }
}

