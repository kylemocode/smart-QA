import React, { Component } from 'react';
import ToggleButton from './ToggleButton';
import KeyWord from './KeyWord';
import Selector from './Selector';
import Text from './selectorOptions/Text';
import Link from './selectorOptions/Link';
import Image from './selectorOptions/Image';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isReveal: false,
            del: false,
            textCount: 0,
            textAreaValue: '',
            keywordList: [],
            selectedValue: '',
            optionsList: []
        }

        // this.handleOpen = this.handleOpen.bind(this);
        // this.handleReveal = this.handleReveal.bind(this);
        // this.onTextInput = this.onTextInput.bind(this);
        // this.onKeywordSubmit = this.onKeywordSubmit.bind(this);
        // this.delKeyword = this.delKeyword.bind(this);
    }

    handleSelectChange = (e) => {
        this.setState({
            selectedValue: e.target.value
        })
    }

    handleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleReveal = () => {
        this.setState({
            isReveal: !this.state.isReveal
        })
    }

    onTextInput = (e) => {
        this.setState({
            textCount:  e.target.value.length
        })
            
    }

    onKeywordSubmit = (text) => {
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
            keywordList: keywords,
            textCount: 0
        })
        
    }

    delKeyword = (i) => {
        const keywords = this.state.keywordList;
        const index = keywords.findIndex((data) => data.props.keyId == i);
        keywords.splice(index,1);
        this.setState({itemList: keywords});

    }

   addOption = () => {
    const items = this.state.optionsList
    const index = items.findIndex((data) => data.key == items.length);
    switch(this.state.selectedValue){
        case("text"):
            items.push(
                <Text
                    key={index <0 ? items.length : `${items.length}${index}`}
                    keyId={index <0 ? items.length : `${items.length}${index}`}
                    delOption={this.delOption}
      />
            )
            this.setState({
                optionsList: items
            })
            console.log(this.state.optionsList)
            break;
        case("image"):
            items.push(
                <Image
                    key={index <0 ? items.length : `${items.length}${index}`}
                    keyId={index <0 ? items.length : `${items.length}${index}`}
                    delOption={this.delOption}
    />
            )
            this.setState({
                optionsList: items
            })
            break;
        case("link"):
            items.push(
                <Link
                    key={index <0 ? items.length : `${items.length}${index}`}
                    keyId={index <0 ? items.length : `${items.length}${index}`}
                    delOption={this.delOption}
    />
            )
            this.setState({
                optionsList: items
            })
            break;
        default:
            return true;
    }
   }

   delOption = (i) => {
    const newOptions = this.state.optionsList;
    const index = newOptions.findIndex((data) => data.props.keyId == i);
    newOptions.splice(index,1);
    this.setState({optionsList: newOptions});
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
                        {this.state.isReveal? <div className="container item_input" style={{opacity: this.state.isReveal?1:0}}>
                        <div className="row">
                            <div className="col-sm-6">
                                <p style={{fontSize: "14px"}}>當用戶輸入以下 相似 或 相同 關鍵字:</p>
                                <input
                                    className="item_textarea" 
                                    placeholder="新增關鍵字 (輸入enter區分關鍵字)"
                                    onChange={this.onTextInput}
                                    onKeyDown={(e) => {
                                        if(e.keyCode==13 && e.target.value!=='' && !e.target.value.includes('\n')) {
                                            e.preventDefault();
                                            this.onKeywordSubmit(e.target.value);
                                            e.target.value="";
                                        }
                                    }}
                                >
                                </input>
                                <span className="item_textCount">{this.state.textCount}/50</span>
                                <div>
                                    <span className="item_warning">{this.state.textCount>50?"※超過字數限制":""}</span>
                                </div>
                                <div style={{display:"flex",marginTop: "8px",flexWrap: "wrap"}}>
                                    {this.state.keywordList}
                                    
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <p style={{fontSize: "14px"}}>機器人回覆:&nbsp; &nbsp; (兩組以上對話將會隨機回復)</p>
                                <div className="container">
                                    <div className="row">
                                        <div>
                                            <Selector handleSelectChange={this.handleSelectChange} selectedValue={this.state.selectedValue}/>
                                            
                                        </div>
                                        <button className="item_btn" onClick={this.addOption}><i class="fas fa-plus"></i></button>
                                        
                                    </div>
                                    
                                </div>
                                <div>
                                    {this.state.optionsList}
                                </div>  
                            </div>
                                
                        </div>
                    </div>: ''}
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

