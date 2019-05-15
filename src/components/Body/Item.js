import React, { Component } from 'react'
import ToggleButton from './ToggleButton';


export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isReveal: false,
            del: false,
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleReveal = this.handleReveal.bind(this);
    }

    handleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleReveal() {
        this.setState({
            isReveal: !this.state.isReveal
        })
    }

    render() {
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
                        <div className="item_status">
                            <p>智能對話狀態: {this.state.isOpen ? '開啟' : '關閉'}</p>
                            <ToggleButton style={{ marginRight: '20px' }} handleOpen={this.handleOpen} isOpen={this.state.isOpen} />
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

                <div className="container item_input">
                    <div className="row">
                        <div className="col-sm-6">
                            <p style={{fontSize: "14px"}}>當用戶輸入以下 相似 或 相同 關鍵字:</p>
                            <textarea 
                                className="item_textarea" 
                                placeholder="新增關鍵字 (輸入enter區分關鍵字)" 
                            >
                            </textarea>
                            
                        </div>
                        <div className="col-sm-6">
                            <p style={{fontSize: "14px"}}>機器人回覆: (兩組以上對話將會隨機回復)</p>
                            <div style={{display: "flex"}}>
                                <select className="item_select">
                                    <option value="" disabled selected>請選擇回覆訊息類型</option>
                                    <option value="">純文字訊息</option>
                                    <option value="">圖文訊息</option>
                                    <option value="">超連結訊息</option>
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
        )
    }
}

