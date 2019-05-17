import React from 'react'

const KeyWord = (props) => {
  const crossStyle={
      width: "32px",
      height: "32px",
      textAlign: "center",
      backgroundColor: "#A5B1BC",
      border: "none",
      borderRight: "solid 1px #F0F0F0",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      paddingBottom: "4px",
      borderRadius: "2px"
  }
  const keywordStyle={
    padding: "8px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  return (
    <div className="item_keyword">
      <button style={crossStyle} onClick={() => props.delKeyword(props.keyId)}>x</button>
      <div style={keywordStyle}>{props.keyword}</div>
    </div>
  )
}


export default KeyWord;