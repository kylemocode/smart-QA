import React, { Component } from 'react';
import ToggleButton from './ToggleButton';
import KeyWord from './KeyWord';
import Selector from './Selector';
import Text from './selectorOptions/Text';
import Link from './selectorOptions/Link';
import Image from './selectorOptions/Image';
import axios from 'axios';
import { intentCreate,intentUpdate,intentDelete } from '../../apiurl'

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
            textValue: [],
            urlValue: [],
            urlRemark: [],
            delItem: false,
            revealButton:false,
            isSaving: false,
            isCreating: false,
            isErroring: false
        }


    }

    componentDidMount() {

        let keywords = this.props.keywords
        let keywordTextArray = []
        if (keywords !== '') {
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



        //options
        const options = this.state.optionsList
        const replysArray = this.state.replys
        const textContent = this.state.textValue
        const urlValue = this.state.urlValue
        const urlRemark = this.state.urlRemark

        if (this.props.replys) {
            this.props.replys.map((reply, i) => {
                if (reply.type == 'text') {

                    options.push(<Text
                        key={reply.uuid}
                        keyId={reply.uuid}
                        delOption={this.delOption}
                        text={reply.content}
                        type="text"
                        getValue={this.getValue}
                        uuid={this.props.uuid}
                    />)
                    replysArray.push({ type: "text", content: reply.content, remark: "" })
                    textContent[`${options.length}${this.props.keyId}`] = reply.content
                } else if (reply.type == 'image') {
                    options.push(<Image
                        key={reply.uuid}
                        keyId={reply.uuid}
                        delOption={this.delOption}
                        type="img"
                        getValue={this.getValue}
                        uuid={this.props.uuid}
                    />)
                    replysArray.push({ type: "image", content: reply.content, remark: "" })
                } else if (reply.type == "url") {
                    options.push(<Link
                        key={reply.uuid}
                        keyId={reply.uuid}
                        delOption={this.delOption}
                        type="url"
                        getUrlContent={this.getUrlContent}
                        getUrlRemark={this.getUrlRemark}
                        url={reply.content}
                        remark={reply.remark}
                        uuid={this.props.uuid}
                    />)
                    replysArray.push({ type: "url", content: reply.content, remark: "" })
                    urlValue[`${options.length}${this.props.keyId}`] = reply.content
                    urlRemark[`${options.length}${this.props.keyId}`] = reply.remark
                }
            })
        }



        setTimeout(() => {
            this.setState(() => ({
                isOpen: this.props.enable,
                keywordList: keywords,
                optionsList: options,
                keywordTextArray: keywordTextArray,
                replys: replysArray,
                textValue: textContent,
                urlValue,
                urlRemark
            }))
        }, 0)
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
            textCount: e.target.value.length
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
                key={index < 0 ? keywords.length : `${keywords.length}${index}`}
                keyId={index < 0 ? keywords.length : `${keywords.length}${index}`}
            />
        )
        this.setState({
            keywordList: keywords,
            textCount: 0,
            keywordTextArray: keywordArray
        })

    }

    delKeyword = (i, text) => {
        const keywords = this.state.keywordList;
        const index = keywords.findIndex((data) => data.props.keyId == i);
        keywords.splice(index, 1);

        let keywordArray = this.state.keywordTextArray;
        let keywordArrayFiltered = keywordArray.filter((keyword) => {
            return keyword !== text
        })

        this.setState({ keywordList: keywords, keywordTextArray: keywordArrayFiltered });
    }

    addOption = () => {

        const items = this.state.optionsList
        const index = items.findIndex((data) => data.key == items.length);
        switch (this.state.selectedValue) {
            case ("text"):
                items.push(
                    <Text
                        key={index < 0 ? items.length : `${items.length}${index}`}
                        keyId={index < 0 ? items.length : `${items.length}${index}`}
                        delOption={this.delOption}
                        type="text"
                        getValue={this.getValue}
                        uuid={this.props.uuid}
                    />
                )

                this.setState({
                    optionsList: items

                })

                break;
            case ("image"):
                items.push(
                    <Image
                        key={index < 0 ? items.length : `${items.length}${index}`}
                        keyId={index < 0 ? items.length : `${items.length}${index}`}
                        delOption={this.delOption}
                        type="img"
                        getValue={this.getValue}
                        uuid={this.props.uuid}
                    />
                )

                this.setState({
                    optionsList: items,

                })
                break;
            case ("link"):
                items.push(
                    <Link
                        key={index < 0 ? items.length : `${items.length}${index}`}
                        keyId={index < 0 ? items.length : `${items.length}${index}`}
                        delOption={this.delOption}
                        type="url"
                        getUrlContent={this.getUrlContent}
                        getUrlRemark={this.getUrlRemark}
                        uuid={this.props.uuid}
                    />
                )

                this.setState({
                    optionsList: items,

                })
                break;
            default:
                return true;
        }
    }

    delOption = (i) => {
        const newOptions = this.state.optionsList;
        const index = newOptions.findIndex((data) => data.props.keyId == i);
        newOptions.splice(index, 1);
        this.setState({ optionsList: newOptions });
    }

    getValue = (value, i) => {
        let textValueArray = this.state.textValue;
        textValueArray[i] = value
        this.setState({
            textValue: textValueArray
        })
    }

    getUrlContent = (url, i) => {
        let urlValueArray = this.state.urlValue;
        urlValueArray[i] = url
        this.setState({
            urlValue: urlValueArray
        })
    }

    getUrlRemark = (remark, i) => {
        let urlRemark = this.state.urlRemark;
        urlRemark[i] = remark
        this.setState({
            urlRemark: urlRemark
        })
    }

    saveqa = () => {
        
        // let inputList = document.getElementsByClassName(`checkBtn-${this.props.uuid}`)
        // console.log(inputList)
        // for(let i=0;i<inputList.length;i++){
        //     inputList[i].click()
        // }

        let replyarray = []
        replyarray = this.state.optionsList.map((option) => {
            
            if (option.props.type === 'text') {
                return { type: 'text', content: this.state.textValue[option.props.keyId] || option.props.text }
            } else if (option.props.type === 'url') {
                return { type: 'url', content: this.state.urlValue[option.props.keyId] || option.props.url, remark: this.state.urlRemark[option.props.keyId] || option.props.remark }
            } else if (option.props.type === 'img') {

            }
        })


        if (!this.props.isCreated) {
            axios({
                method: 'POST', url: intentCreate, headers: { ofelId: '888' }, data: {
                    intents: [
                        {
                            enable: this.state.isOpen ? this.state.isOpen : false,
                            keywords: this.state.keywordTextArray,
                            replys: replyarray
                        }
                    ]
                }
            })
                .then(() => {
                    if(this.state.isErroring === true){
                        this.setState({
                            isErroring: false
                        })
                    }else{
                        return true
                    }
                })
                .then(() => this.setState({
                    created: true
                }))
                .then(() => this.setState({isCreating: true}))
                .then(() => setTimeout(() => {
                    this.setState({isCreating: false})
                },2500))
                .catch(() => this.setState({isErroring: true}))

        } else {
            //update api
            axios({
                method: 'POST', url: intentUpdate, headers: { ofelId: '888' }, data: {
                    intents: [

                        {
                            uuid: this.props.uuid,
                            enable: this.state.isOpen,
                            keywords: this.state.keywordTextArray,
                            replys: replyarray,
                        }
                    ]
                }
            })
                // .then(() => alert('儲存成功'))
                .then(() => {
                    if(this.state.isErroring === true){
                        this.setState({
                            isErroring: false
                        })
                    }else{
                        return true
                    }
                })
                .then(() => this.setState({isSaving: true}))
                .then(() => setTimeout(() => {
                    this.setState({isSaving: false})
                },2500))
                .catch(() => this.setState({isErroring: true}))
        }

    }

    render() {

        return (
            <div
                className="container item_container_flex rwd_constainer"
                style={{
                    transform: this.state.del ? 'translateX(250px)' : 'translateX(0px)',
                    opacity: this.state.del ? 0 : 1
                }}
                onMouseOver={() => {
                    this.setState({ delItem: true })
                }}
                onMouseOut={() => {
                    this.setState({ delItem: false })
                }}
            >
                <div className="rwd_itemcontainer">
                    <div>
                        <div className="item_title" style={{ backgroundColor: this.state.isOpen ? '#1982D8' : '#E0E0E0', transition: '0.3s' }}>
                            <p>{this.state.keywordTextArray.slice(0, 2).map((text) => {
                                return text + ' '
                            })}</p>

                            <div
                                style={{
                                    backgroundColor:this.state.isOpen ? this.state.revealButton ? '#106fbc' : '#1982D8' : this.state.revealButton ? '#D5D5D5' : '#E0E0E0',
                                    transition: '0.3s'
                                }}
                                onMouseOver={() => this.setState({revealButton: true})}
                                onMouseOut={() => this.setState({revealButton: false})}
                                onClick={this.handleReveal}
                            >
                                {this.state.isReveal ? <i class="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i>}</div>
                        </div>
                        {this.state.isReveal ? <div className="container item_input" style={{ opacity: this.state.isReveal ? 1 : 0 }}>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 ">
                                    <p className="rwd_content" style={{ fontSize: "14px" }}>當用戶輸入以下 相似 或 相同 關鍵字:</p>
                                    
                                    <div className="tool">
                                        <input
                                            className="item_textarea rwd_content"
                                            placeholder="新增關鍵字 (輸入enter區分關鍵字)"
                                            onChange={this.onTextInput}
                                            onKeyDown={(e) => {
                                                if (e.keyCode == 13 && e.target.value !== '' && !e.target.value.includes('\n')) {
                                                    e.preventDefault();
                                                    this.onKeywordSubmit(e.target.value);
                                                    e.target.value = "";
                                                }
                                            }}
                                        >
                                            
                                        </input>
                                        <span className="tooltiptext">輸入"enter"區分關鍵字</span>
                                    </div>
                                    
                                    
                                    <div>
                                        <span className="item_warning">{this.state.textCount > 50 ? "※超過字數限制" : ""}</span>
                                    </div>
                                    <div style={{ display: "flex", marginTop: "8px", flexWrap: "wrap" }}>
                                        {this.state.keywordList}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 rwd_marginTop">
                                    <p className="rwd_content" style={{ fontSize: "14px" }}>機器人回覆:&nbsp; &nbsp; (兩組以上對話將會隨機回復)</p>
                                    <div className="container rwd_content">
                                        <div className="row">
                                            <div>
                                                <Selector handleSelectChange={this.handleSelectChange} selectedValue={this.state.selectedValue} />

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
                        </div> : ''}
                        <hr style={{ margin: "0" }} />
                        <div className="item_status">
                            <div style={{ display: "flex", alignItems: 'center',justifyContent:"flex-end"}}>
                                <ToggleButton handleOpen={this.handleOpen} isOpen={this.state.isOpen} />
                                <p style={{ fontSize: "14px" }} style={{ marginRight: '20px', marginTop: '5px',opacity:0.7 }}>智能對話狀態</p>
                                
                            </div>
                            <div>
                                {this.state.isSaving && <span style={{marginRight:"20px",fontSize:"14px"}}><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_success.png " style={{ width: '14px', height: '14px', marginRight: '7px', color: 'white', marginBottom: '1px' }}></img>儲存成功!</span>}
                                {this.state.isCreating && <span style={{marginRight:"20px",fontSize:"14px"}}><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_success.png  " style={{ width: '14px', height: '14px', marginRight: '7px', color: 'white', marginBottom: '1px' }}></img>建立成功!</span>}
                                {this.state.isErroring && <span style={{marginRight:"20px",fontSize:"14px"}}><img src="https://s3-ap-northeast-1.amazonaws.com/www.memepr.com/smartQA/icon_caution.png  " style={{ width: '14px', height: '14px', marginRight: '7px', color: 'white', marginBottom: '1px' }}></img>此對話模組尚未設計完成</span>}
                                <button
                                    className="update_btn"
                                    style={{
                                        marginTop: '3px'
                                    }}
                                    onClick={this.saveqa}
                                >
                                {this.props.isCreated || this.state.created ? "儲存" : "建立"}
                                </button>
                            </div>
                            

                        </div>
                    </div>
                </div>
                <div
                    className="rwd_delbtn"
                    style={{
                        visibility: this.state.delItem ? 'visible' : 'hidden',
                        opacity: this.state.delItem ? 1 : 0,
                        transition: ' 0.5s '
                    }}
                >
                    <button
                        className="cleanup_btn"
                        onClick={
                            () => {
                                if (window.confirm('確認要刪除?')) {
                                    setTimeout(() => this.props.deleteItem(this.props.keyId), 700)
                                    this.setState({ del: true })
                                    axios({
                                        method: 'POST', url: intentDelete, headers: { 'ofelId': '888' }, data: {
                                            "intents": [
                                                {
                                                    "uuid": this.props.uuid
                                                }
                                            ]
                                        }
                                    })
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

