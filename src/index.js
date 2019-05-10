/* ----------------------------------------------------------------------- */
// [ IMPORT ]
import React from 'react';
import ReactDOM from 'react-dom';
// React Cache Manager - ServiceWorker
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
// Ant Design
import 'antd/dist/antd.css';
import { BackTop } from 'antd';
import { Collapse } from 'antd';
import { Input } from 'antd';
import { Tag } from 'antd';
import { Button } from 'antd';
import { Divider } from 'antd';
import { notification } from 'antd';
import { Popconfirm, message } from 'antd';
import { Icon } from 'antd';
import { Upload } from 'antd';
import { Popover } from 'antd';
// Import - .CSS
import './index.css';
// Import - Self Component
import FileUploader from './FileUploader';
import FileUploader_dynamic from './FileUploader_dynamic';
// Import - Constant
const Panel = Collapse.Panel;
const { TextArea } = Input;
/* ----------------------------------------------------------------------- */


// [ CONSTANT ]
// --- Web Title ---
document.title = 'Smart Q&A';
const ServerUrl = 'https://ofel.ai/api/console/';
const ServerUrl_chat = 'https://ofel.ai/api/chat/';
const notification_type = ['success', 'info', 'warning', 'error'];


const getUrlParameter = function getUrlParameter(sParam) {
	let sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) {
			return sParameterName[1];
		}
	}
	return undefined;
};


const ofelId = getUrlParameter('ofelId');
// Testing
//const ofelId = '222';
const IntentItems = [];
const Collapse_defaultActiveKeys = [];

let botInfo = {};
const getBotInfo = () => {
	fetch(ServerUrl + 'getBotInfo.php', {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({ ofelId: ofelId })
	})
		.then((response) => response.text())
		.then((responseText) => {
			let obj_root = JSON.parse(responseText);
			if (obj_root['botInfo'] === undefined)
				return;
			botInfo = obj_root['botInfo'];
			checkInitRender(0);
		})
		.catch((error) => {
			console.error(error);
		});
}
let intentData_raw = [];
let intentData_raw_open = undefined;
// Get intentData_raw
const getIntentData_raw = () => {
	fetch(ServerUrl + 'getIntentList.php', {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({ ofelId: ofelId })
	})
		.then((response) => response.text())
		.then((responseText) => {
			let obj_root = JSON.parse(responseText);
			//console.log(obj_root);
			intentData_raw = obj_root['intentData'];
			intentData_raw_open = obj_root['intentData_open'];
			checkInitRender(1);
		})
		.catch((error) => {
			console.error(error);
		});
}

const checkInitRender_array = new Array(2);
function checkInitRender(index) {
	checkInitRender_array[index] = true;
	for (let i = 0; i < checkInitRender_array.length; i++) {
		if (checkInitRender_array[i] !== true) {
			return;
		}
	}
	// Run initRender if all passed
	initRender();

}

// Init Get Data
if (ofelId !== undefined && ofelId.trim() !== '') {
	getBotInfo();
	getIntentData_raw();
}

/*
intentData_raw = [
{
	'intentId' : '1-sdgnd',
	'keyword' : '課程/class',
	'reply' : '我們的課程是......',
}
,
{
	'intentId' : '1-sdgnf',
	'keyword' : '課程/class2',
	'reply' : '我們的課程是......2'
}
];
intentData_raw = [];
*/




class IntentItem_submit extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const btnStr = {
			'update': {
				'text': '更新 | Update',
				'icon': 'check-square-o',
			},
			'insert': {
				'text': '加入 | Join In',
				'icon': 'plus-square-o',
			}
		}
		const submitType = this.props.submitType;

		return (
			<Button className='IntentItem-control-submit' onClick={this.props.onClick}
				type="primary" icon={btnStr[submitType]['icon']} size='small'>{btnStr[submitType]['text']}</Button>
		);
	}
};


class IntentItem extends React.Component {
	constructor(props) {
		super(props);
		// Init Function
		this.handleKeywordChange = this.handleKeywordChange.bind(this);
		this.handleReplyChange = this.handleReplyChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUndo = this.handleUndo.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		// Init state
		this.initState();
		this.state.intentTitle = props.intentTitle;
		this.state.index = props.index;

		this.state.isNewIntent = undefined;
		this.state.intentData = undefined;

	}

	initState = () => {
		this.state = {};
		this.state.keyword_changed = 0;
		this.state.keyword_value = '';
		this.state.reply_changed = 0;
		this.state.reply1_value = '';
		this.state.url_value = '';
		this.state.isAssignedIntentData = false;
	}

	handleKeywordChange(e) {
		this.setState({ keyword_value: e.target.value });
	}

	handleReplyChange(e) {
		this.setState({ reply1_value: e.target.value });
	}


	handleSubmit(e) {
		const keyword_value = this.state.keyword_value;
		const reply1_value = this.state.reply1_value;
		const isNewIntent = this.state.isNewIntent;
		const intentData = this.state.intentData;
		const intentTitle = this.state.intentTitle;
		const intentType = this.props.intentType;

		const url_value = this.state.url_value.trim();

		const intentName = intentTitle;
		const notiKey = 'update_failed_intent_' + intentTitle;
		const notiTitle = (isNewIntent ? '加入' : '更新') + ' ' + intentTitle;

		// Checking 
		// Keyword length
		if (keyword_value.length <= 0) {
			notification[notification_type[2]]({
				key: notiKey,	// For prevent repeat notification
				message: notiTitle,
				description: '請輸入字眼',
			});
			return;
		}
		// Reply length
		if (reply1_value.length <= 0) {
			notification[notification_type[2]]({
				key: notiKey,	// For prevent repeat notification
				message: notiTitle,
				description: '請輸入回覆',
			});
			return;
		}
		// Same as before
		let url_value_check = (intentData !== undefined && intentData['rep_url'] !== undefined) ? intentData['rep_url'] : "";
		if (!isNewIntent && keyword_value === intentData['keyword'] && reply1_value === intentData['reply'] &&
			url_value === url_value_check) {
			notification[notification_type[2]]({
				key: notiKey,	// For prevent repeat notification
				message: notiTitle,
				description: '請修改需要更新的內容',
			});
			return;
		}



		const json_obj = {
			action: isNewIntent ? 'insert' : 'update',
			ofelId: ofelId,
			keyword_value: keyword_value,
			reply1_value: reply1_value,
			url_value: this.state.url_value,
			intentType: intentType
		};

		//console.log(json_obj);

		if (!isNewIntent) {
			// update
			json_obj['intentId'] = intentData['intentId'];
		}

		fetch(ServerUrl + 'intentApi.php', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(json_obj)
		})
			.then((response) => response.text())
			.then((responseText) => {
				responseText = responseText.trim();
				// Debug
				//alert(responseText);
				//console.log('handleSumbit- '+responseText)

				if (responseText === '') {
					notification[notification_type[3]]({
						key: notiKey,	// For prevent repeat notification
						message: notiTitle,
						description: '錯誤',
					});
					return;
				}

				let obj_root = JSON.parse(responseText);

				if (obj_root['failed'] === 1) {
					if (obj_root['failed_error'] === 'Intent quota fulled.') {
						notification[notification_type[3]]({
							key: notiKey,	// For prevent repeat notification
							message: notiTitle,
							description: '可用Intent總數已滿，請聯絡管理員添加。',
						});
						return;
					}
				}

				if (obj_root['success'] === 1) {
					// Success
					// --- Notification success
					notification[notification_type[0]]({
						key: notiKey,	// For prevent repeat notification
						message: notiTitle,
						description: '更新成功',
					});
					// --- Assign Data
					let obj_intentData = obj_root['intentData'];
					this.state.isNewIntent = false;
					// Base Data
					if (this.state.intentData === undefined)
						this.state.intentData = {};
					this.state.intentData.intentId = obj_intentData['intentId'];
					this.state.intentData.keyword = obj_intentData['keyword'];
					this.state.intentData.reply = obj_intentData['reply'];
					this.state.intentData.rep_url = obj_intentData['rep_url'];
					// Input View Data
					this.state.keyword_value = obj_intentData['keyword'];
					this.state.reply1_value = obj_intentData['reply'];
					this.state.url_value = obj_intentData['rep_url'];
					// Refresh UI
					this.setState(this.state);
				}

			})
			.catch((error) => {
				notification[notification_type[3]]({
					key: notiKey,	// For prevent repeat notification
					message: notiTitle,
					description: '網絡錯誤',
				});
				console.error(error);
			});



	}

	handleUndo(e) {
		if (this.state.intentData === undefined) {
			// insert row -> just clear input view
			this.state.keyword_value = '';
			this.state.reply1_value = '';
		} else {
			// update row -> Change Input View Data to Base intentData
			this.state.keyword_value = this.state.intentData.keyword;
			this.state.reply1_value = this.state.intentData.reply;
			this.state.url_value = this.state.intentData.rep_url;
		}
		// Refresh UI
		this.setState(this.state);
	}

	handleDelete(e) {
		const intentData = this.state.intentData;

		const notiKey = 'delete_failed_intent_' + this.state.intentTitle;
		const intentName = this.state.intentTitle;

		// Checking
		if (this.state.isNewIntent) {
			// not have data before
			notification[notification_type[0]]({
				key: notiKey,	// For prevent repeat notification
				message: '刪除 ' + intentName,
				description: '完成，這intent本來已是空的。',
			});
			// Clear Input
			this.handleUndo(e);
			return;
		} else {
			// already have data
			// Call api to delete
			const json_obj = {
				action: 'delete',
				ofelId: ofelId, intentId: intentData['intentId'],
			};

			fetch(ServerUrl + 'intentApi.php', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
				body: JSON.stringify(json_obj)
			})
				.then((response) => response.text())
				.then((responseText) => {
					responseText = responseText.trim();
					// Debug
					//alert(responseText);

					if (responseText === '') {
						notification[notification_type[3]]({
							key: notiKey,	// For prevent repeat notification
							message: '刪除 ' + intentName,
							description: '錯誤',
						});
						return;
					}
					let obj_root = JSON.parse(responseText);

					if (obj_root['success'] === 1) {
						// Success
						// --- Notification success
						notification[notification_type[0]]({
							key: notiKey,	// For prevent repeat notification
							message: '刪除 ' + intentName,
							description: '完成刪除',
						});
						// Clean & Init state
						this.initState();

						// --- Assign Data
						this.state.isNewIntent = true;
						// Base Data
						this.state.intentData = undefined;
						// Input View Data
						//this.state.keyword_value = '';
						//this.state.reply1_value = '';
						// Refresh UI
						this.setState(this.state);
					}


				})
				.catch((error) => {
					notification[notification_type[3]]({
						key: notiKey,	// For prevent repeat notification
						message: '刪除 ' + intentName,
						description: '網絡錯誤',
					});
					console.error(error);
				});




		}
	}


	render() {
		const index = this.props.index;
		const intentTitle = this.props.intentTitle;

		const intentData_jsonStr = this.props.intentData_jsonStr;

		if (this.state.isNewIntent === undefined) {
			this.state.isNewIntent = intentData_jsonStr == '';
		}
		const isNewIntent = this.state.isNewIntent;

		// DebugintentDataz
		/*
		if(this.state.intentTitle==='7'){
		////console.log(this.state);
	}*/


		const submitType = !isNewIntent ? 'update' : 'insert';
		// Init intentData
		if (!this.state.isAssignedIntentData && this.state.intentData === undefined && !isNewIntent) {
			this.state.intentData = JSON.parse(intentData_jsonStr.toString());
			//alert(intentData['keyword']);

			this.state.isAssignedIntentData = true;

			this.state.url_value = this.state.intentData['rep_url'];
		}
		const intentData = this.state.intentData;

		// handle keyword
		let keyword_value = this.state.keyword_changed !== 0 ? this.state.keyword_value : (!isNewIntent ? intentData['keyword'] : '');
		if (this.props.intentType === 'opening') {
			keyword_value = 'Opening';
		}
		if (this.state.keyword_changed === 0) {
			this.state.keyword_changed = 1;
			this.state.keyword_value = keyword_value;
		}





		// Make referName
		let referName = makeReferName(keyword_value);
		let referName_tag_layout = <Tag className='IntentItem-keyword-tag' color="purple" style={{ marginTop: 10 }}>識別標籤 Tags</Tag>;
		let referName_layout = <div className="testChatbot_keyword_item">{referName}</div>;
		if (this.props.intentType === 'opening') {
			referName_layout = '';
			referName_tag_layout = '';
		}
		if (referName === '') {
			referName_layout = '';
			referName_tag_layout = '';
		}

		// <div className="testChatbot_suggestion_item">suggestion</div>


		// handle reply
		const reply1_value = this.state.reply_changed !== 0 ? this.state.reply1_value : (!isNewIntent ? intentData['reply'] : '');
		if (this.state.reply_changed === 0) {
			this.state.reply_changed = 1;
			this.state.reply1_value = reply1_value;
		}

		let marginBottom = '8px';
		let intentTitle_tagsColor = 'rgba(0,0,0,0.45)';
		if (this.props.intentType === 'opening') {
			marginBottom = '30px';
			intentTitle_tagsColor = 'rgba(0,0,0,0.65)';
		}


		// '' = can input , 'true' = cannot input 
		let isKeywordTextCanInputAttr = '';
		if (this.props.intentType === 'opening') {
			isKeywordTextCanInputAttr = 'true';
		}

		return (


			<div className='IntentItem-vertical-div' style={{ marginBottom: marginBottom }}>

				<div className='IntentItem-intentTitle'>
					<Icon type="tags-o" style={{ marginRight: 10, fontSize: 16, color: intentTitle_tagsColor }} />
					{intentTitle}
				</div>

				<div className='IntentItem-container-div'>


					<div className='IntentItem-keywordReply-div'>

						<div className='IntentItem-keyword-div'>
							<Tag className='IntentItem-keyword-tag' color="geekblue">字眼 | Keywords</Tag>
							<TextArea disabled={isKeywordTextCanInputAttr} className="IntentItem-keyword-tf" maxLength="100"
								placeholder={!isNewIntent && intentData['reply'] !== undefined ? '原本: ' + intentData['keyword'] : '字眼'}
								autosize={{ minRows: 2, maxRows: 6 }} value={keyword_value}
								onChange={this.handleKeywordChange} />


							<div className="IntentItem-referName-div" style={{ width: 200, fontSize: 12, color: 'rgba(0,0,0,0.55)', paddingTop: 5 }}>
								{"最多輸入50個字眼，使用逗號,分隔字眼"}
							</div>

							{referName_tag_layout}
							<div className="IntentItem-referName-div" style={{ width: 200, fontSize: 12, color: 'rgba(0,0,0,0.55)', paddingTop: 5 }}>
								{referName_layout}
							</div>
						</div>

						<div className='IntentItem-reply-div' >
							<Tag className='IntentItem-reply-tag' color="green">回覆 | Reply</Tag>



							<div className='div-horizontal-start' style={{ marginTop: 2 }}>


								<div className='div-vertical-start' style={{ width: 200 }}>

									<TextArea className="IntentItem-reply-tf" view_index='1'
										placeholder={!isNewIntent && intentData['reply'] !== undefined ? '原本: ' + intentData['reply'] : '回覆'}
										autosize={{ minRows: 2, maxRows: 6 }} value={reply1_value}
										onChange={this.handleReplyChange} />


									<Input className="IntentItem-reply-link-tf" style={{ marginTop: 2 }} value={this.state.url_value}
										onChange={(e) => this.setState({ url_value: e.target.value })} view_index='1'
										placeholder={'網址連結 | URL link'}
									/>

								</div>


								<div className='div-vertical-start' style={{ marginLeft: 10 }}>
									<div style={{ fontSize: 13 }}></div>
									<FileUploader />

									<FileUploader_dynamic />
								</div>

							</div>
						</div>

						{/* --- Old FileUploader_dynamic ---
				<div className='IntentItem-reply-div'>
				<Tag className='IntentItem-reply-tag' color="volcano">動態資料 | Dynamic Data</Tag>
				<FileUploader_dynamic />
				</div>
			*/}


						{/* IntentItem-keywordReply-div */}
					</div>

					<div className='IntentItem-control_root-div'>

						<Divider type="vertical" className='IntentItem-control-divider' />

						<div className='IntentItem-control-div'>

							<IntentItem_submit index={index} submitType={submitType} onClick={this.handleSubmit} />

							<Popconfirm title={"確定復原修改 ?"} onConfirm={this.handleUndo} okText="是" cancelText="否" >
								<Button className='IntentItem-control-undo'
									type="default" icon='reload' size='small'>復原 | Undo</Button>
							</Popconfirm>

							<Popconfirm title={"確定刪除 [Intent " + intentTitle + "] ?"} onConfirm={this.handleDelete} okText="是" cancelText="否">
								<Button className='IntentItem-control-delete'
									type="danger" icon='delete' size='small'>刪除 | Delete</Button>
							</Popconfirm>

						</div>

					</div>

				</div>

			</div>

		);
	}
}

class Test_Chatbot extends React.Component {
	constructor(props) {
		super(props);
		// Init state
		this.state = { input_value: '', isFirstTimeOpen: true, chatDatas: [], suggestions: [] };
		this.state.isOpened = false;
		// Init Function
		this.handleOpenTestChatbox = this.handleOpenTestChatbox.bind(this);
		this.handleReplyChange = this.handleReplyChange.bind(this);
		this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
		this.handleSumbitButton = this.handleSumbitButton.bind(this);
		this.callGetChatApi = this.callGetChatApi.bind(this);
		this.getChatMsgLayout = this.getChatMsgLayout.bind(this);
	}
	handleOpenTestChatbox(e) {
		this.setState({ isOpened: !this.state.isOpened });

		if (this.state.isOpened) {
			// ScrollBottom - click Open
			setTimeout(() => {
				this.scrollToBottom();
			}, 1000);
		}
	}
	handleReplyChange(e) {
		this.setState({ input_value: e.target.value });
	}


	handleInputKeyPress(e) {
		if (e.key === 'Enter') {
			// Click 'Enter' Key
			this.handleSumbitButton(e);
		}
	}
	handleSumbitButton(e) {
		//////console.log('handleSumbitButton');

		let input_value = this.state.input_value.trim();
		// Checking
		if (input_value === '') {
			return;
		}

		// Clear input_value
		this.state.input_value = '';

		// Add self msg -> refresh UI
		let chatData = { self_inputText: input_value };
		this.state.chatDatas.push(chatData);

		// Refresh UI
		this.setState(this.state);


		// call getChatApi -> refresh UI
		let prev_intentId = this.state.prev_intentId !== undefined ? this.state.prev_intentId : '';
		this.callGetChatApi(prev_intentId, input_value);



	}


	callGetChatApi(prev_intentId, inputText) {
		const json_obj = {
			ofelId: ofelId,
			prev_intentId: prev_intentId, inputText: inputText,
		};

		fetch(ServerUrl_chat + 'icb_getChat.php', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(json_obj)
		})
			.then((response) => response.text())
			.then((responseText) => {
				responseText = responseText.trim();
				// Debug
				//alert(responseText);
				//console.log('GetChatApi - '+responseText);

				if (responseText === '') {
				}

				let obj_root = JSON.parse(responseText);

				let chatData = obj_root['ChatData'];
				let intentId = chatData['intentId'];
				if (chatData['replys'] !== undefined) {
					this.state.prev_intentId = intentId;
				}
				let replys = chatData['replys'];

				let suggestions = obj_root['Suggestion'];

				// Assign Data to state
				this.state.chatDatas.push(chatData);
				if (obj_root['Suggestion'] !== undefined) {
					this.state.suggestions = suggestions;
				}
				// Refresh UI
				this.setState(this.state);

				this.scrollToBottom();

			})
			.catch((error) => {
				let chatData = { replys: [{ type: 'text', content: '沒有網絡連接 !' }] };
				this.state.chatDatas.push(chatData);
				// Refresh UI
				this.setState(this.state);
				this.scrollToBottom();
			});

	}


	getChatMsgLayout() {
		// <div className="testChatbot_msg_self_div">self</div>
		// <div className="testChatbot_msg_another_div">another</div>
		//let layout = '';
		let layouts = [];

		for (let i = 0; i < this.state.chatDatas.length; i++) {
			let obj = this.state.chatDatas[i];


			if (obj['self_inputText'] !== undefined) {
				// Self
				if (obj['self_inputText'].trim() !== '') {
					layouts.push(<div key={layouts.length} className="testChatbot_msg_self_div">{obj['self_inputText'].trim()}</div>);
				}

			} else {
				// Another
				if (obj['replys'] !== undefined) {
					// Have match intent & replys
					let replys = obj['replys'];
					for (let j = 0; j < replys.length; j++) {
						let reply = replys[j];
						if (reply['type'] === 'text' && reply['content'].trim() !== '') {
							//layout+= <div className="testChatbot_msg_another_div">{reply['content'].trim()}</div>;
							layouts.push(<div key={layouts.length} className="testChatbot_msg_another_div">{reply['content'].trim()}</div>);
						} else if (reply['type'] === 'url' && reply['content'].trim() !== '') {
							//layout+= <div className="testChatbot_msg_another_div">{reply['content'].trim()}</div>;
							let url = reply['content'].trim();
							let url_ahref = url;
							if (!url.startsWith('http')) {
								url_ahref = 'http://' + url;
							}

							layouts.push(<div key={layouts.length} className="testChatbot_msg_another_div">
								<a href={url_ahref} target="_blank">{url}</a>
							</div>);
						}
					}
				} else {
					// Not have matched intent
					let reply_str = "不好意思，我還不是很聰明，請加入更多智能回覆 | I'm not very smart yet, pls add more Smart Q&A!";
					layouts.push(<div key={layouts.length} className="testChatbot_msg_another_div">{reply_str}</div>);


				}
			}


		}
		return layouts;
	}

	getSuggestionLayout = () => {
		// 	<div className="testChatbot_suggestion_item">suggestion</div>
		let layouts = [];
		if (this.state.suggestions !== undefined) {
			for (let i = 0; i < this.state.suggestions.length; i++) {
				let suggest = this.state.suggestions[i].trim();
				if (suggest !== '') {
					layouts.push(<div key={layouts.length} value={suggest} className="testChatbot_suggestion_item" onClick={this.handleSuggestItemClick}>{suggest}</div>);
				}
			}
		}
		return layouts;
	}

	handleSuggestItemClick = (e) => {
		// get div text
		let input_value = e.currentTarget.textContent.trim();

		// Checking
		if (input_value === '') {
			return;
		}

		// Add self msg -> refresh UI
		let chatData = { self_inputText: input_value };
		this.state.chatDatas.push(chatData);

		// Refresh UI
		this.setState(this.state);

		// call getChatApi -> refresh UI
		let prev_intentId = this.state.prev_intentId !== undefined ? this.state.prev_intentId : '';
		this.callGetChatApi(prev_intentId, input_value);


	}


	scrollToBottom = () => {
		// tryCatch - prevent scrollIntoView after layout closed error
		try {
			this.messagesEnd.scrollIntoView({ block: 'end', behavior: 'smooth' });
		}
		catch (err) {
			//////console.log(err);
		}
		//this.messagesEnd.scrollIntoView({  block: 'end',  behavior: 'smooth' });
	}


	render() {

		// Check First Time Open TestChatBot Layer
		if (this.state.isOpened && this.state.isFirstTimeOpen) {
			this.state.isFirstTimeOpen = false;
			// First Time Open TestChatBot Layer - get opening
			this.callGetChatApi('', '');
		}

		if (this.state.isOpened) {
			// Lock background windows scroll
			document.body.style.overflow = "hidden";
		} else {
			// Unlock background windows scroll
			document.body.style.overflow = "auto";
		}


		let float_layer = '';
		if (this.state.isOpened) {
			float_layer =
				<div className="testChatbot_float_div">
					<Icon className="testChatbot_close_btn" type="close-circle-o" style={{ fontSize: 18, color: '#cf1322' }} onClick={this.handleOpenTestChatbox} />


					<div className="testChatbot_msg_div">
						{this.getChatMsgLayout()}

						<div style={{ marginTop: 10 }} ref={(el) => { this.messagesEnd = el; }}></div>
					</div>
					<div className="testChatbot_suggestion_div">
						<div style={{ height: 50 }} />
						{this.getSuggestionLayout()}
					</div>
					<div className="testChatbot_input_div">
						<Input placeholder="Input Message" maxLength={200} onChange={this.handleReplyChange} value={this.state.input_value} onKeyPress={this.handleInputKeyPress}></Input>
						<Icon type="right-square" style={{ paddingLeft: 5, fontSize: 30, color: '#2088f9' }} onClick={this.handleSumbitButton} />
					</div>

				</div>;
		} else {
			float_layer = '';
		}


		return (
			<div>
				<Button className="float_btn_testChatbot" type="dashed" icon="message"
					onClick={this.handleOpenTestChatbox}
				>簡單測試 | Simple Test</Button>
				{float_layer}


			</div>
		);
	}
};


function makeReferName(keyword_str) {
	let keywords = keyword_str.split(',');
	let referName = '';
	for (let i = 0; i < keywords.length; i++) {
		if (keywords[i] !== '') {
			referName = keywords[i];
			break;
		}
	}
	return referName;
}

function initRender() {
	for (let i = 0; i < botInfo['intentQuota'] + 1; i++) {
		const index = i;
		//let intentTitle = i===0?'開場白 Opening':i.toString();
		let intentTitle = i === 0 ? '開場白 Opening' : 'Q&A ' + i.toString();

		let intentType = i === 0 ? 'opening' : 'normal';

		let intentData_jsonStr = '';
		let jsonData_index = 0;
		if (intentType === 'normal') {
			// Because 開場白
			jsonData_index = i - 1;

			intentData_jsonStr = jsonData_index < intentData_raw.length ? JSON.stringify(intentData_raw[jsonData_index]) : '';
		} else if (intentType === 'opening') {
			// Temp Hidden Opening
			continue;
			// intentData_jsonStr = intentData_raw_open!==undefined?JSON.stringify(intentData_raw_open):'';
		}

		//////console.log(intentTitle+'---'+jsonData_index+'---'+intentData_jsonStr);

		// For Open Collapse Use
		//Collapse_defaultActiveKeys.push(index.toString());
		IntentItems.push(
			<IntentItem key={index} intentTitle={intentTitle} index={index} intentType={intentType}
				intentData_jsonStr={intentData_jsonStr}
			/>
			/*<div header={"Intent "+intentTitle} key={index.toString()}>
			<IntentItem intentTitle={intentTitle} index={index} intentType={intentType}
			intentData_jsonStr={intentData_jsonStr}
			/>
			</div>*/
		);
	}


	const str_top_desc_intent = "您可以在下方設定關鍵字眼及回覆，若使用者輸入時，系統會分析及配對最吻合的關鍵字眼，便會顯示相對應的回覆。\n\n" +
		"關鍵字眼不限語言.數量，為獲得更準確的回覆，建議每組Q&A 設定多個關鍵字眼，並以逗號,符號分隔。\n" +
		"另外，如使用者所輸入的問題，也相同程度地乎合兩條Q&A，則會以愈前的 Q&A 愈優先。"
		+ "\n請參照以下例子:";

	const str_top_example_intent = "[例子]\n" +
		"Q&A1      " + " 字眼: 課程,class,簡介" + "                      回覆: 我們的課程皆以引導孩子自然快樂地學習為基礎......\n" +
		"Q&A2      " + "字眼: 課程,class,歲數,年齡,年紀" + "      回覆: 課程適合6個月至4歲孩子就讀以及......\n\n" +
		"使用者: 你們的課程是?\n" +
		"   系統: 我們的課程皆以引導孩子自然快樂地學習為基礎......\n" +
		"   *( Q&A1及Q&A2 都是最乎合使用者問題，以前者優先 )\n\n" +
		"使用者: 課程適合哪個歲數?\n" +
		"   系統: 課程適合6個月至4歲孩子就讀以及......\n" +
		"   *( Q&A2 乎合最多關鍵字眼，所以最乎合使用者問題 )\n\n";


	const str_top_desc_intent_eng = "You can type in the default keywords and replies below. When a question is asked, the system will analysis and reply with the most suitable answer.\n\n" +
		"Keywords are not limited to language and amount of words. In order to have a more accurate response, we suggest having various of keywords and separate them with “/” for each Q&A.\n\n" +
		"* if the client’s question matches with 2 default Q&A, we will adopt the answer from the former Q&A.\n\n" +
		"Please see the example below:  (Example)";

	const str_top_example_intent_eng = "Set Q&A 1: Keywords: Class/ Programme/ Introduction\nResponse: Our programme aims to provide a nature and happy environment for children to learn…\n\n" +
		"Set Q&A 2: Keywords : Programme/ Class / Age\nResponse: Our programme is suitable for children from 6 months to 4 years old and …\n\n" +
		"After save the Q&As, when visitor interact with your Sbot:\nVisitor types: What is your programme about?\nSbot replies:  Our programme aims to provide a nature and happy environment for children to learn…\n" +
		"*(Q&A 1 and Q&A 2 both match with the client’s question, therefore the former answer will be used)\n\n" +
		"Visitor types: What is the suitable age for this programme?\nSbot replies:  Our programme is suitable for children from 6 months to 4 years old and …\n*(Q&A 2 has the most accurate keywords, therefore it is the best answer for the question)";



	ReactDOM.render(
		<div className='baseDiv'>
			<BackTop>
				<div className="ant-back-top-inner">回到頂 | Top</div>
			</BackTop>

			<Test_Chatbot />

			<h1 style={{ background: 'rgba(0,0,0,0.04)', padding: '18px', color: 'rgba(0,0,0,0.85)' }}>Smart Q&A</h1>

			<br />
			<p style={{ paddingLeft: '5px', color: 'rgba(0,0,0,0.65)' }}>可用智能回覆數目 | Available Smart Q&A : {botInfo['intentQuota']}</p>
			<p style={{ paddingLeft: '5px', color: 'rgba(0,0,0,0.65)', fontSize: 12 }}>{"建議使用桌面版作修改\nIt is recommended to use the desktop version for modification."}</p>

			<div>

				<Popover placement="bottomLeft" content={
					<div>
						<p style={{ whiteSpace: 'pre-wrap', paddingLeft: '0px', color: 'rgba(0,0,0,0.85)', fontSize: 12 }}>{str_top_desc_intent}</p>
						<p style={{ whiteSpace: 'pre-wrap', paddingLeft: '0px', color: 'rgba(0,0,0,0.65)', fontSize: 11 }}>{str_top_example_intent}</p>
					</div>
				} title="例子及說明">
					<Button type="primary">例子及說明</Button>
				</Popover>

				<Popover placement="bottomLeft" content={
					<div>
						<p style={{ whiteSpace: 'pre-wrap', paddingLeft: '0px', color: 'rgba(0,0,0,0.85)', fontSize: 13 }}>{str_top_desc_intent_eng}</p>
						<p style={{ whiteSpace: 'pre-wrap', paddingLeft: '0px', color: 'rgba(0,0,0,0.65)', fontSize: 12 }}>{str_top_example_intent_eng}</p>
					</div>
				} title="Example">
					<Button type="primary" style={{ marginLeft: 18 }} >Example</Button>
				</Popover>

			</div>


			<p></p>

			{/*
			<Collapse defaultActiveKey={Collapse_defaultActiveKeys}>
			{IntentItems}
			</Collapse>*/
			}

			{IntentItems}

		</div>,
		document.getElementById('root')
	);

}


// Prevent Cache index.html caused not show new build version by avoiding using registerServiceWorker
// registerServiceWorker();
// Unregister ServiceWorker For Prev User
unregister();

