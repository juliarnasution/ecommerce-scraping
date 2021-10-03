
const express = require('express')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const normalizePort = require('./src/utils/index')


const app = express()
const port = normalizePort(process.env.PORT || '3000');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',function(req,res){
    res.send('Welcome to web scrapper');
});
app.use('/scrapper', require('./src/routes/scrapper'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
