import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {

  render() {
    
    return (
      <div>
        <div className="container container_flex rwd_header">
          <div className="header__title">智能問答設置</div>
          <button className="header__button">測試聊天機器人</button>
        </div>
      </div>
    )
  }
}

