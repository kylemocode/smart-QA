import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {

  render() {
    
    return (
      <div>
        <div className="container container_flex rwd_header">
          <div className="header__title">智能問答設置</div>
          <button className="header__button"><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_test.png" style={{width:'13px',height: '13px',marginRight: '7px',marginBottom: '4px'}}></img>測試聊天機器人</button>
        </div>
      </div>
    )
  }
}

