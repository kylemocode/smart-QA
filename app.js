const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));



app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
