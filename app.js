const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes')(app);

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
});