import React from 'react'

const New_Button = (props) => {
  const btnStyle = {
    //   width: '128px',
      height: '40px',
      backgroundColor: '#1982D8',
      color: 'white',
      borderRadius: '4px',
      border:　'none',
      padding: '9px 20px'
  }

  return (
    <div className="container" style={{cursor: 'pointer'}}>
      <button style={btnStyle} onClick={props.addItem}>+  新增智能</button>
      <span className="count">{props.count}/{props.intentQuota}(已建立智能/智能上限)</span>
    </div>
  )
}


export default New_Button;