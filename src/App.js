import React, { Component } from 'react'
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      botgetAPI: {
        intentQuota: null,
        ofelId: null,
        orgName: null
      }
    }
  }
  componentDidMount() {
    // fetch('https://ofel.ai/node/bot/get',{headers: {'ofelId':'888'}})
    //   .then((data) => data.json())
    //   .then((res) => this.setState(() => ({
    //     botgetAPI: {
    //       ofelId: res.data[0].ofelId,
    //       intentQuota: res.data[0].intentQuota
    //     }
    //   })))
    axios.get('https://ofel.ai/node/bot/get',{headers: {'ofelId':'888'}})
      // .then((res) => console.log(res.data.data[0]))
      
      .then((res) => {
        // console.log(res);
        this.setState({
          botgetAPI: {
            ofelId: res.data.data[0].ofelId,
            intentQuota: res.data.data[0].intentQuota,
            orgName: res.data.data[0].orgName
          }
        })
      })
      
  }
  render() {
    const {
      botgetAPI: {
        intentQuota,
        ofelId,
      },
    } = this.state;

    // console.log(intentQuota);
    // console.log(ofelId);
    return (
      <div>
        <Header />
        {ofelId ? (
          <Body intentQuota={intentQuota} ofelId={ofelId}/>
        ) : null}
      </div>
    )
  }
}

