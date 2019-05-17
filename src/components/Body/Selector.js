import React from 'react'

const Selector = (props) => {
  return (
    <div style={{display: "flex",marginBottom: "7px"}}>
        <select className="item_select decorated">
            <option value="" disabled selected>請選擇回覆訊息類型</option>
            <option value="" >純文字訊息</option>
            <option value="" >圖文訊息</option>
            <option value="" >超連結訊息</option>
        </select>
        
    </div>
  )
}

export default Selector;


