import React from 'react';
// import logo from './logo.svg';
import './FileUploader.css';
import { message, Button } from 'antd';
import { Upload, Icon } from 'antd';


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


class FileUploader_dynamic extends React.Component {
  /*props = {
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


  render() {
    let btn_msg = '加入動態資料\nDrag File Here\n(excel/csv)';

    return (
      <div className="clearfix" style={{marginTop:5}}>
      <Upload {...props} >

      <Button style={{width:180,height:70}}>
      <div className="div-horizontal-center">
      <Icon type="file-text" />
      <div className="ant-upload-text" style={{width:'100%',whiteSpace:'pre-wrap',marginLeft:10}} >
      {btn_msg}</div>
      </div>
      </Button>

      </Upload>
      </div>
      );
    }
  }


  export default FileUploader_dynamic;
