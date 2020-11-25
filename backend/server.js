const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors())

app.use('/', express.static(path.join(__dirname, 'client')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', require('./routes/api'));

app.use('/[a-zA-Z]+', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
)

app.listen(process.env.PORT || 3000);

console.log('Started');

module.exports = app;
