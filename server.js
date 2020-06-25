const express = require('express');
const bodyParser = require("body-parser");
const mainController = require('./controllers/mainController');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/views', express.static(__dirname + '/public/views'));
app.use('/s', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/script', express.static(__dirname + '/public/scripts'));
app.use('/images', express.static(__dirname + '/assets'));
mainController(app);


app.listen(PORT, () => {
    console.log('server is running on port '+ PORT);
});
