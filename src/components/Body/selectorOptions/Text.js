import React from 'react'

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textCount: 0,
      content: "",
      isFocus: false,
      isFocusClick: false,
      delHover: false,
      isEmpty: false
    }
  }

  componentDidMount() {
    this.setState({
      content: this.props.text
    })
  }

  handleChange = (e) => {
    this.setState({
      textCount: e.target.value.length,
      content: e.target.value
    })
    this.props.getValue(e.target.value, this.props.keyId)
  }

  handleFocus = () => {
    this.setState({
      isFocus: true
    })
  }

  handleFocusClick = () => {
    this.setState({
      isFocus: true,
      isFocusClick: !this.state.isFocusClick
    })
  }

  handleBlur = () => {
    this.setState({
      isFocus: false,
      
    })
  }

  checkInput = () => {
    var input = document.getElementsByTagName('textarea')[0];
    if(input.value===''){
      this.setState({
        isEmpty: true
      })
    }else{
      this.setState({
        isEmpty: false
      })
    }
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
      <div className="optionStyle" 
      
      onMouseOver={() => {
        this.setState({ delHover: true })
      }}

      onMouseOut={() => {
        this.setState({ delHover: false})
      }}
      >
        <div style={{ position: "relative", width: '100%',border:this.state.isEmpty?"solid 2px #E22424":""}} className="option-container">
          <div style={headerStyle}>
            <p><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/path_513.png" style={{ width: '12px', height: '12px', marginRight: '7px', color: 'white', marginBottom: '1px' }}></img>純文字訊息</p>
          </div>
          <div>
            <textarea placeholder="請輸入文字訊息" style={textareaStyle} onChange={this.handleChange} value={this.state.content} onFocus={this.handleFocus} onBlur={this.handleBlur}>
            </textarea>
            <span style={textCountStyle}>{this.state.textCount}/75</span>
          </div>
        </div>
        <div className="rwd_cleanup_btn inside_div" style={{
          visibility: this.state.delHover ? 'visible' : 'hidden',
          opacity: this.state.delHover ? 1 : 0,
          transition: ' 0.5s '
      }}>
            <button
              className="cleanup_btn"
              style={{ marginLeft: "10px", marginTop: "2px",outline:"none", width:"24px",height: "24px",padding: "2px",fontSize: "12px"}}
              onClick={() => this.props.delOption(this.props.keyId)}
              >
              <i class="fas fa-trash-alt"></i>
            </button>
            
            <button className="check-btn" style={{display: "none"}} onClick={this.checkInput}></button>
        </div>
      </div>
    )
  }

}

export default Text
