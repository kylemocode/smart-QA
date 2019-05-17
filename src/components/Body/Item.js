import React, { Component } from 'react'
import ToggleButton from './ToggleButton';
import KeyWord from './KeyWord';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isReveal: false,
            del: false,
            textCount: 0,
            textAreaValue: '',
            keywordList: []
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleReveal = this.handleReveal.bind(this);
        this.onTextInput = this.onTextInput.bind(this);
        this.onKeywordSubmit = this.onKeywordSubmit.bind(this);
        this.delKeyword = this.delKeyword.bind(this);
    }

    handleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleReveal() {
        this.setState({
            isReveal: !this.state.isReveal
        })
    }

    onTextInput(e) {
        this.setState({
            textCount:  e.target.value.length
        })
            
    }

    onKeywordSubmit(text) {
        const keywords = this.state.keywordList ? this.state.keywordList : []
        const index = keywords.findIndex((keyword) => keyword.key == keywords.length)
        keywords.push(
            <KeyWord 
                keyword={text}
                delKeyword={this.delKeyword}
                key={index <0 ? keywords.length : `${keywords.length}${index}`}
                keyId={index <0 ? keywords.length : `${keywords.length}${index}`}
            />
        )
        this.setState({
            keywordList: keywords
        })
        
    }

    delKeyword(i) {
        const keywords = this.state.keywordList;
        const index = keywords.findIndex((data) => data.props.keyId == i);
        keywords.splice(index,1);
        this.setState({itemList: keywords});

    }

    render() {
        const optionStyle={
            height: "33px"
        }
        return (
            <div
                className="container item_container_flex"
                style={{
                    transform: this.state.del ? 'translateX(250px)' : 'translateX(0px)' ,
                    opacity: this.state.del ? 0 : 1
                }}
            >
                <div style={{ width: '100%', marginRight: '20px' }}>
                    <div>
                        <div className="item_title" style={{ backgroundColor: this.state.isOpen ? '#1982D8' : '#E0E0E0', transition: '0.3s' }}>
                            <p>按此編輯對話名稱</p>
                            <div style={{ backgroundColor: this.state.isOpen ? '#106fbc' : '#D5D5D5', transition: '0.3s' }} onClick={this.handleReveal}>{this.state.isReveal ? <i class="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i>}</div>
                        </div>
                        <div className="container item_input">
                            <div className="row">
                                <div className="col-sm-6">
                                    <p style={{fontSize: "14px"}}>當用戶輸入以下 相似 或 相同 關鍵字:</p>
                                    <textarea 
                                        className="item_textarea" 
                                        placeholder="新增關鍵字 (輸入enter區分關鍵字)"
                                        onChange={this.onTextInput}
                                        onKeyDown={(e) => {
                                            // if(e.target.value.length>=50) {
                                            //     e.returnValue = false;
                                            // }
                                            if(e.keyCode==13 && e.target.value!=='' && !e.target.value.includes('\n')) {
                                                this.onKeywordSubmit(e.target.value);
                                                e.target.value="";
                                            }
                                        }}
                                    >
                                    </textarea>
                                    <span className="item_textCount">{this.state.textCount}/50</span>
                                    <div>
                                        <span className="item_warning">{this.state.textCount>50?"※超過字數限制":""}</span>
                                    </div>
                                    <div style={{display:"flex",marginTop: "8px",flexWrap: "wrap"}}>
                                        {this.state.keywordList}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <p style={{fontSize: "14px"}}>機器人回覆: (兩組以上對話將會隨機回復)</p>
                                    <div style={{display: "flex"}}>
                                        <select className="item_select decorated">
                                            <option value="" disabled selected style={optionStyle}>請選擇回覆訊息類型</option>
                                            <option value="" style={optionStyle}>純文字訊息</option>
                                            <option value="" style={optionStyle}>圖文訊息</option>
                                            <option value="" style={optionStyle}>超連結訊息</option>
                                        </select>
                                        <button className="item_btn"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style={{margin: "0"}}/>
                        <div className="item_status">
                            <p style={{fontSize: "14px"}}>智能對話狀態: {this.state.isOpen ? '開啟':'關閉'}</p>
                            <ToggleButton style={{marginRight: '20px'}} handleOpen={this.handleOpen} isOpen={this.state.isOpen}/>

                        </div>
                    </div>

                </div>


                <div>
                    <button
                        className="cleanup_btn"
                        onClick={
                            () => {
                                setTimeout(() => this.props.deleteItem(this.props.keyId) , 700)
                                this.setState({ del: true })
                            }
                        }
                    >
                        <i class="fas fa-trash-alt"></i>
                    </button>

                
                
            </div>
        </div>
        )
    }
}

