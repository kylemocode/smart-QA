import React, { Component } from 'react';
import ToggleButton from './ToggleButton';
import KeyWord from './KeyWord';
import Selector from './Selector';
import Text from './selectorOptions/Text';
import Link from './selectorOptions/Link';
import Image from './selectorOptions/Image';
import axios from 'axios';

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
            optionsList: [],
            created: false,
            replys: [],
            keywordTextArray: [],
        }

        
    }

    componentDidMount() {
        let keywords = this.props.keywords
        let keywordTextArray = []
        if(keywords!==''){
            keywords = keywords.replace(/'/g, '"');
            keywords = JSON.parse(keywords);
            keywordTextArray = keywords
            keywords = keywords.map((keyword) => {
                return <KeyWord 
                keyword={keyword}
                delKeyword={this.delKeyword}
                key={`${this.state.keywordList.length}${this.props.keyId}`}
                keyId={`${this.state.keywordList.length}${this.props.keyId}`}
            />
            })
        }
       
        console.log(keywords)
        
        //options
        const options = this.state.optionsList
        const replysArray = this.state.replys
        console.log(this.props.replys)
        if(this.props.replys){
            this.props.replys.map((reply) => {
                if(reply.type == 'text'){
                    options.push(<Text
                        key={`${options.length}${this.props.keyId}`}
                        keyId={`${options.length}${this.props.keyId}`}
                        delOption={this.delOption}
                        text={reply.content}
          />)
                replysArray.push({type: "text",content: reply.content,remark: ""})
                }else if(reply.type == 'image'){
                    options.push(<Image
                        key={`${options.length}${this.props.keyId}`}
                        keyId={`${options.length}${this.props.keyId}`}
                        delOption={this.delOption}
          />)
                    replysArray.push({type: "image",content: reply.content})
                }else if(reply.type == "url"){
                    options.push(<Link
                        key={`${options.length}${this.props.keyId}`}
                        keyId={`${options.length}${this.props.keyId}`}
                        delOption={this.delOption}
          />)
                    replysArray.push({type: "url",content: reply.content,remark: ""})
                }
            })
        }
            
            setTimeout(() => {
                this.setState(() => ({
                    isOpen: this.props.enable,
                    keywordList: keywords,
                    optionsList: options,
                    keywordTextArray: keywordTextArray
                }))
            },0)
            
      
        // console.log(keywordTextArray)
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
        const keywordArray = this.state.keywordTextArray
        keywordArray.push(text)
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
            textCount: 0,
            keywordTextArray: keywordArray
        })
        
    }

    delKeyword = (i,text) => {
        const keywords = this.state.keywordList;
        const index = keywords.findIndex((data) => data.props.keyId == i);
        keywords.splice(index,1);

        let keywordArray = this.state.keywordTextArray;
        let keywordArrayFiltered = keywordArray.filter((keyword) => {
            return keyword !== text
        })

        this.setState({keywordList: keywords,keywordTextArray: keywordArrayFiltered});
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

   saveqa = () => {
        if(!this.props.isCreated) {
            axios({ method: 'POST', url: 'https://ofel.ai/node/intent/create', headers: {ofelId: '888'}, data: {
                intents:[
                    {
                      enable: true,
                      keywords: this.state.keywordTextArray,
                      replys: [
                        { type: "text", "content": "你好有什麼幫到你?" }
                      ]
                    }
                ]
                } })
                .then(() => this.setState({
                    created: true
                }))
                .then(() => alert('對話建立成功'))
                .catch(() => alert('請輸入完整內容'))
        }else{
            //update api
            axios({ method: 'POST', url: 'https://ofel.ai/node/intent/update', headers: {ofelId: '888'}, data: {
                intents: [
                    
                    {
                      uuid: this.props.uuid,
                      enable: this.state.isOpen,
                      keywords: this.state.keywordTextArray,
                      replys: [
                        { type: 'text', content: 'Update Reply1' ,remark: ''},
                        { type: 'text', content: 'Update Reply2' ,remark: ''},
                      ],
                    }
                ]
                } })
                .then(() => alert('儲存成功'))
        }

   }

    render() {

        return (
            <div
                className="container item_container_flex rwd_constainer"
                style={{
                    transform: this.state.del ? 'translateX(250px)' : 'translateX(0px)' ,
                    opacity: this.state.del ? 0 : 1
                }}
            >
                <div  className="rwd_itemcontainer">
                    <div>
                        <div className="item_title" style={{ backgroundColor: this.state.isOpen ? '#1982D8' : '#E0E0E0', transition: '0.3s' }}>
                            <p>{this.state.keywordTextArray.slice(0,2).map((text) => {
                                return text+ ' '
                            })}</p>
                            
                            <div style={{ backgroundColor: this.state.isOpen ? '#106fbc' : '#D5D5D5', transition: '0.3s' }} onClick={this.handleReveal}>{this.state.isReveal ? <i class="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i>}</div>
                        </div>
                        {this.state.isReveal? <div className="container item_input" style={{opacity: this.state.isReveal?1:0}}>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <p className="rwd_content" style={{fontSize: "14px"}}>當用戶輸入以下 相似 或 相同 關鍵字:</p>
                                <input
                                    className="item_textarea rwd_content" 
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
                            <div className="col-md-6 col-sm-12 rwd_marginTop">
                                <p className="rwd_content" style={{fontSize: "14px"}}>機器人回覆:&nbsp; &nbsp; (兩組以上對話將會隨機回復)</p>
                                <div className="container rwd_content">
                                    <div className="row">
                                        <div>
                                            <Selector handleSelectChange={this.handleSelectChange} selectedValue={this.state.selectedValue}/>
                                            
                                        </div>
                                        <div className="rwd_additemBtn">
                                            <button className="item_btn" onClick={this.addOption}><i class="fas fa-plus"></i></button>
                                        </div>
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
                            <div style={{display: "flex",alignItems: 'center'}}>
                                <p style={{fontSize: "14px"}} style={{marginRight: '20px',marginTop:'5px'}}>智能對話狀態: {this.state.isOpen ? '開啟':'關閉'}</p>
                                <ToggleButton  handleOpen={this.handleOpen} isOpen={this.state.isOpen}/>
                            </div>
                            <button className="update_btn" style={{marginTop: '3px'}} onClick={this.saveqa}>{this.props.isCreated || this.state.created?"儲存":"建立"}</button>
                            
                        </div>
                    </div>
                </div>
                <div className="rwd_delbtn">
                    <button
                        className="cleanup_btn"
                        onClick={
                            () => {
                                if(window.confirm('確認要刪除?')){
                                    setTimeout(() => this.props.deleteItem(this.props.keyId) , 700)
                                    this.setState({ del: true })
                                    axios({ method: 'POST', url: 'https://ofel.ai/node/intent/delete', headers: {'ofelId': '888'}, data: {
                                        "intents":[
                                            {
                                            "uuid": this.props.uuid
                                            }
                                        ]
                                        } })
                                    }
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

