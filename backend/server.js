const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors())

app.use('/', express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use('/api', require('./routes/api'));

app.listen(process.env.PORT || 3000);

console.log('Started');

module.exports = app;
