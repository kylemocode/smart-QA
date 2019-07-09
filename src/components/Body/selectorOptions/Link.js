import React from 'react'


class Link extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      remark: ''
    }
  }
  componentDidMount() {
    this.setState({
      content: this.props.url,
      remark: this.props.remark
    })
  }

  handleUrlChange = (e) => {
    this.setState({
      content: e.target.value
    })
    this.props.getUrlContent(e.target.value, this.props.keyId)
  }

  handleRemarkChange = (e) => {
    this.setState({
      remark: e.target.value
    })
    this.props.getUrlRemark(e.target.value, this.props.keyId)
  }

  render() {
    const headerStyle = {
      color: '#8C96A0',
      fontSize: '12px',
      height: '37px',
      border: 'solid 1px #F0F0F0',
      width: '100%',
      padding: '13px 16px'
    }
    const textareaStyle = {
      width: '100%',
      minHeight: '120px',
      border: 'solid 1px #F0F0F0',
      maxHeight: '120px',
      padding: '16px',
      color: '#101010',
      fontSize: '12px'
    }
    const textCountStyle = {
      position: 'absolute',
      fontSize: '10px',
      bottom: '10px',
      right: '20px',
      color: '#CBCBCB'
    }
    return (
      <div className="optionStyle">
        <div style={{ position: "relative", width: '100%' }}>
          <div style={headerStyle}>
            <p><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_link.png" style={{ width: '15px', height: '15px', marginRight: '7px' }}></img>超連結訊息</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input placeholder="請輸入網址連結 ex: www.abc.com" style={{ height: '49px', fontSize: '12px', color: '#101010', border: 'solid 1px #F0F0F0', borderTop: 'none', borderBottom: 'none', padding: '16px', outline: 'none', }} onChange={this.handleUrlChange} value={this.state.content}></input>
            <input placeholder="在此輸入文字註解" style={{ height: '64px', fontSize: '12px', color: '#101010', border: 'solid 1px #F0F0F0', padding: '16px', outline: 'none', }} onChange={this.handleRemarkChange} value={this.state.remark}></input>
          </div>
        </div>

        <div className="rwd_cleanup_btn">
          <button
            className="cleanup_btn"
            style={{ marginLeft: "15px", marginTop: "-1px" }}
            onClick={() => this.props.delOption(this.props.keyId)}>
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    )
  }

}

export default Link