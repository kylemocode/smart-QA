# ✨ TODO SmartQ&A Console UI V1 ✨


> ### SmartQ&A Console UI - v1 (Old Version) - React Code


# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server

Visit http://localhost:3000/?ofelId=222 in your browser. You will see SmartQ&A Console v1.

* Please use ofelId=222 For Testing / Development.



## Dependencies
- [async](https://www.npmjs.com/package/async) － 管理async process
- [axios](https://www.npmjs.com/package/axios) - 用來send request
- [body-parser](https://www.npmjs.com/package/body-parser) - express用來讀 request with content-type: application/json 之類
- [config](https://www.npmjs.com/package/config) - config file 管理, 會讀config/default.json 
- [cors](https://www.npmjs.com/package/cors) - 為express加上cors的header, 允許server response to 來自不同domain的request
- [express](https://www.npmjs.com/package/express) - 用來處理及route HTTP request
- [express-validator](https://www.npmjs.com/package/express-validator) - 用來作HTTP request的基本資料格式驗證
- [firebase-admin](https://www.npmjs.com/package/firebase-admin) - firebase admin sdk
- [lodash](https://www.npmjs.com/package/lodash) - 一堆實用function
- [moment](https://www.npmjs.com/package/moment) - js原生的Date太爛, moment 比較好處理時間相關的東西
- [morgan](https://www.npmjs.com/package/morgan) - for HTTP request log
- [mysql2](https://www.npmjs.com/package/mysql2) - mysql client
- [sequelize](https://www.npmjs.com/package/sequelize) - ORM 管理mysql的一切, from create table to query
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli) - cli要用來做migration
- [tracer](https://www.npmjs.com/package/tracer) - better log than ```console.log```
- [uuid](https://www.npmjs.com/package/uuid) - 用來generate uuid
- [validator](https://www.npmjs.com/package/validator) - 提供基本資料格式驗證

## Application Structure

- `index.js` - The entry point to our application. 


## Required

Node.js
React

## License
This project is under no license.
