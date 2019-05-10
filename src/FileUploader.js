import React from 'react';
// import logo from './logo.svg';
import './FileUploader.css';
import { message, Button } from 'antd';
import { Upload, Icon, Modal } from 'antd';


const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  multiple:false,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class FileUploader extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
    /*
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
    */
    ],
  };

  /*static defaultProps = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  }*/

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage/*, fileList*/ } = this.state;


    let btn_msg = '加入圖像\nDrag Image Here';

    //let upload_btn_msg = '上傳圖片\nUpload Image';

    //const uploadButton = (
    //  <div className="div-horizontal-center" style={{height:'50px',width:'100px'}}>
    //    <Icon type="plus" />
    //    <div className="ant-upload-text" style={{/*For can use \n*/whiteSpace:'pre-wrap',
    //    height:'50px',width:'100px'}}>{upload_btn_msg}</div>
    //  </div>
    //);
    return (
      <div className="clearfix" style={{marginTop:2}}>
      <Upload {...props} >

      <Button style={{width:180,height:70}}>
      <div className="div-horizontal-center">
      <Icon type="picture" />
      <div className="ant-upload-text" style={{width:'100%',whiteSpace:'pre-wrap',marginLeft:10}} >
      {btn_msg}</div>
      </div>
      </Button>

      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>


    );
  }
}


export default FileUploader;
