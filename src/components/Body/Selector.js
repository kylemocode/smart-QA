import React from 'react'

const Selector = (props) => {
  return (
    <div style={{display: "flex",marginBottom: "7px"}}>
        <select className="item_select decorated" value={props.selectedValue} onChange={props.handleSelectChange}>
            <option value="" disabled selected>請選擇回覆訊息類型</option>
            <option value="text" >純文字訊息</option>
            <option value="image" >圖文訊息</option>
            <option value="link" >超連結訊息</option>
        </select>
        
    </div>
  )
}

export default Selector;


