import React from 'react'

const ToggleButton = (props) => {
  return (
    <div className="toggleButton">
        <span>off</span>
        <label class="switch">
            <input type="checkbox" onClick={props.handleOpen}/>
            <span class="slider round"></span>
        </label>
        <span style={{color: props.isOpen? '#1982D8': '#E0E0E0',transition:'0.3s'}}>on</span>
    </div>
  )
}


export default ToggleButton;