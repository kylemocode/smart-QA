import React from 'react'

const Selector = (props) => {
  return (
    <div style={{display: "flex",marginBottom: "7px"}}>
        <select className="item_select decorated" value={props.selectedValue} onChange={props.handleSelectChange}>
            <option value="" disabled selected>請選擇回覆訊息類型</option>
            <option value="text" ><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/path_513.png" style={{width:'12px',height: '12px',marginRight: '7px',color: 'white'}}></img>純文字訊息</option>
            <option value="image" ><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_pic.png" style={{width:'15px',height: '15px',marginRight: '7px'}}></img>圖文訊息</option>
            <option value="link" ><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_link.png" style={{width:'15px',height: '15px',marginRight: '7px'}}></img>超連結訊息</option>
        </select>
        
    </div>
  )
}

export default Selector;


