import React from 'react'

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textCount: 0,
      
    }
  }
  
  handleChange = (e) => {
      this.setState({
          textCount: e.target.value.length
      })
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
      minHeight: '64px',
      border: 'solid 1px #F0F0F0',
      maxHeight: '64px',
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

    const uploadStyle = {
        width: '100%',
        height: '158px',
        backgroundColor: '#D8D8D8',
        border: 'solid 1px #F0F0F0',
        margin: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '12px'
    }
    return (
      <div className="optionStyle">
        <div style={{position: "relative",width:'100%'}}>
            <div style={headerStyle}>
                <p>圖文訊息</p>
            </div>

            <label style={uploadStyle}>
                <input type="file"  style={{display:"none"}}/>
                <p>按此上傳照片或拖曳檔案至此</p>
            </label>

            <div style={{marginTop: '-6px'}}>
                <textarea placeholder="在此輸入文字註解" style={textareaStyle} onChange={this.handleChange}>
                </textarea>
                <span style={textCountStyle}>{this.state.textCount}/30</span>
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

export default Image
