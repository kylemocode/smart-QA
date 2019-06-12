import React from 'react'

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textCount: 0,
      content: ""
      // reply: {
      //   type: "text",
      //   content: "",
      //   remark: ""
      // }
    }
    

  }

  componentDidMount(){
    this.setState({
      content: this.props.text
    })
  }

  handleChange = (e) => {
    this.setState({
      textCount: e.target.value.length,
      content: e.target.value
    })
    this.props.getValue(e.target.value,this.props.keyId)
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
        <div style={{position: "relative",width:'100%'}}>
            <div style={headerStyle}>
                <p><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/path_513.png" style={{width:'12px',height: '12px',marginRight: '7px',color: 'white',marginBottom: '1px'}}></img>純文字訊息</p>
            </div>
            <div>
                <textarea placeholder="請輸入文字訊息" style={textareaStyle} onChange={this.handleChange} value={this.state.content}>
                </textarea>
                <span style={textCountStyle}>{this.state.textCount}/75</span>
            </div>
        </div>

        <div className="rwd_cleanup_btn">
            <button
            className="cleanup_btn"
            style={{marginLeft: "15px",marginTop: "-1px"}}
            onClick={() => this.props.delOption(this.props.keyId)}>
            <i class="fas fa-trash-alt"></i>
            </button>
        </div>
      </div>
    )
  }

}

export default Text
