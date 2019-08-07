import React from 'react'

const ToggleButton = (props) => {
  return (
    <div className="toggleButton">
        <label class="switch">
            <input type="checkbox" onClick={props.handleOpen} checked={props.isOpen? true:false}/>
            <span class="slider round"></span>
        </label>
    </div>
  )
}


export default ToggleButton;