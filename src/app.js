const express = require('express');
const mongoose = require('mongoose');

require('./db');
const session = require('express-session');
const path = require('path');
//const auth = require('./auth.js');
const Message = mongoose.model('Message');
const app = express();

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
  Message.find({}, function(err, messages){
  if(err){
    console.log(err);
  }
  res.render('index', {messages:messages});
});
});
app.post('/', (req, res) => {
  let newTitle = req.body.title.replace(/[^A-Z0-9]+/ig, "-");
  new Message({
  title: newTitle,
  message: req.body.message,
  timeStamp: new Date()
  }).save(function(err){
  if(err){
    console.log(err);
    console.log('Message post error');
  }
});
res.redirect('/');
});
app.get('/reply/:title', (req, res) =>{
  //let mess = req.body.reply
  Message.findOne({title: req.params.title}, function(err, message){
    //message.reply.push(mess);
    //message.save(done);
    res.render('reply', {messages:message});
  });
});
app.post('/reply/:title', (req, res) =>{
  let mess = req.body.reply
  Message.findOne({title: req.params.title}, function(err, message){
    message.reply.push(mess);
    message.save(function(err){
      if(err){
        console.log(err);
      }
    });
  });
  res.redirect('back');
});
app.get('/write-message', (req, res) => {
  res.render('write-message');
});

app.post('/write-message', (req, res) => {
  new Message({
  title: req.body.title,
  message: req.body.message,
  //description: req.body.description,
  //poster: req.session.user._id
  }).save(function(err){
  if(err){
    console.log(err);
    console.log('Message post error');
  }

});
res.redirect('/');
});

app.get('/register', (req, res) => {
});

app.post('/register', (req, res) => {
});


app.get('/login', (req, res) => {
});

app.post('/login', (req, res) => {
});

app.listen(process.env.PORT || 3000);
