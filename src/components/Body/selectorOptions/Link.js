import React from 'react'


class Link extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      remark: '',
      delHover: false
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
      <div className="optionStyle" onMouseOver={() => {
        this.setState({ delHover: true })
      }}

      onMouseOut={() => {
        this.setState({ delHover: false})
      }}>
        <div style={{position: "relative",width:'100%'}}>
            <div style={headerStyle}>
                <p><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_link.png" style={{width:'15px',height: '15px',marginRight: '7px'}}></img>超連結訊息</p>
            </div>
            <div style={{display: 'flex',flexDirection:'column'}}>
                <input placeholder="請輸入網址連結 ex: www.abc.com" style={{height: '49px',fontSize:'12px',color:'#101010',border:'solid 1px #F0F0F0',borderTop: 'none',borderBottom: 'none',padding: '16px'}} onChange={this.handleUrlChange} value={this.state.content}></input>
                <input placeholder="在此輸入文字註解" style={{height: '64px',fontSize:'12px',color:'#101010',border:'solid 1px #F0F0F0',padding: '16px'}} onChange={this.handleRemarkChange} value={this.state.remark}></input>
            </div>
        </div>
        <div className="rwd_cleanup_btn inside_div" style={{
          visibility: this.state.delHover ? 'visible' : 'hidden',
          opacity: this.state.delHover ? 1 : 0,
          transition: ' 0.5s '
      }}>
            <button
              className="cleanup_btn"
              style={{ marginLeft: "15px", marginTop: "-1px",width:"24px",height: "24px",padding: "2px"}}
              onClick={() => this.props.delOption(this.props.keyId)}>
              <i class="fas fa-trash-alt"></i>
            </button>
        </div>
      </div>
    )
  }

}

export default Link