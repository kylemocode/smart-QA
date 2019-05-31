import React, { Component } from 'react'
import Header from './components/Header/Header';
import Body from './components/Body/Body';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      botgetAPI: {}
    }
  }
  componentDidMount() {
    fetch('https://ofel.ai/node/bot/get',{headers: {'ofelId':'222'}})
      .then((data) => data.json())
      .then((res) => this.setState(() => ({
        botgetAPI: {
          ofelId: res.data[0].ofelId,
          intentQuota: res.data[0].intentQuota
        }
      })))
  }
  render() {
    return (
      <div>
        <Header />
        <Body intentQuota={this.state.botgetAPI.intentQuota} ofelId={this.state.botgetAPI.ofelId}/>
      </div>
    )
  }
}

