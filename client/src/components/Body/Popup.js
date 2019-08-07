import React from 'react'
import Modal from 'react-modal';
import './popup.css';

const Popup = (props) =>  {
    const containerStyle = {
        width: '539px',
        height: '546px',
        backgroundColor: 'black'
    }
    return (
        <Modal
            isOpen={props.modalOpen}
            onRequestClose={props.handlePopupClose}
            closeTimeoutMS={100}
            style={{overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.55)'
                
              },
              content: {
                padding: '0px',
                width: '380px',
                height: '420px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                border: 'none',
                background: '#fff',
                // overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '5px',
                outline: 'none',
                overflow: 'visible'
              }}}>
            <div style={{height:'220px',backgroundColor:'transparent'}}>
                
                <div style={{width:'100%',height:'220px',margin:'0',borderRadius:'5px',position:'relative',bottom:'40px',backgroundImage:'url("https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/ofel/Subscribe.png")',backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'}}>
                    
                </div>
            </div>
            
            <div style={{textAlign:'center',fontWeight:'700',width:'100%',height:'120px'}}>
                <p>哎呀!智能問答設置已達目前方案上限</p>
                <p>快快升級你的方案以解鎖完整功能!</p>
            </div>
            
            <div style={{width:'100%',height:'80px',display:'flex',borderTop:'solid 1px rgba(0,0,0,0.3)'}}>
              <div style={{width:'50%',height:'100%',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',borderRight:'solid 1px rgba(0,0,0,0.3)',fontWeight:'700'}}>
                <p style={{top:'50px'}}>取消</p>
              </div>
              <div style={{width:'50%',height:'100%',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',fontWeight:'700'}}>
                <p style={{color:'#FFB818'}}>立即升級</p>
              </div>
            </div>
        </Modal>
    )
}

export default Popup;