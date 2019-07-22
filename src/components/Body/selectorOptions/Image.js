import React from 'react'
import FileBase64 from 'react-file-base64';
import { relative } from 'path';
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textCount: 0,
      image: '',
      remark: ''
    }
  }

  componentDidMount() {
    this.setState({
      image: this.props.img,
      remark: this.props.remark
    })
   
  }

  handleChange = (e) => {
    this.setState({
      textCount: e.target.value.length,
      remark: e.target.value
    })
    this.props.getImageRemark(e.target.value, this.props.keyId)
  }
  getFiles = (files) => {
    if (/image/.test(files.type)) {
      this.setState({image:files.base64})
      this.props.getImage(files.base64, this.props.keyId)
    }
  }
  handleUpload = (e) => {
    // get the files
    e.preventDefault();
    e.stopPropagation();
    let files = e.target.files;
    
    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };
        
        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          if (this.props.multiple) this.getFiles(allFiles);
          else this.getFiles(allFiles[0]);
        }
      } // reader.onload

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
      minHeight: '64px',
      border: 'solid 1px #F0F0F0',
      maxHeight: '64px',
      padding: '16px',
      color: '#101010',
      fontSize: '12px',
      outline: 'none',
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
      margin: '0px',
      fontSize: '12px',
      opacity: 0,
      zIndex: 3,
      outline: 'none',
    }
    return (
      <div className="optionStyle">
        <div style={{ position: "relative", width: '100%' }}>
          <div style={headerStyle}>
            <p><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_pic.png" style={{ width: '15px', height: '15px', marginRight: '7px' }}></img>圖文訊息</p>
          </div>
          <div
            style={{
              backgroundColor: '#D8D8D8',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              border: '1px solid #F0F0F0',
            }}
          >
            {this.state.image &&
              <img
                src={this.state.image}
                style={{ maxWidth: '200px', maxHeight: '140px', position: 'absolute' }}
              />}
            <input
              type="file"
              onChange={this.handleUpload}
              style={uploadStyle}
            />
            {!this.state.image && <div style={{ position: 'absolute', color: '#FFF', fontSize: '14px', zIndex: 2 }}>按此上傳照片或拖曳檔案至此</div>}
          </div>

          <div style={{marginTop:'-6px'}}>
            <textarea placeholder="在此輸入文字註解" style={textareaStyle} onChange={this.handleChange} value={this.state.remark}>
            </textarea>
            <span style={textCountStyle}>{this.state.textCount}/30</span>
          </div>
        </div>


        <div className="rwd_cleanup_btn inside_div">
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

export default Image
