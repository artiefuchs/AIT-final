const mongoose = require('mongoose');
//Schema
const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, unique:true, required: true},
  //_id: Schema.Types.ObjectId
});
const MessageSchema = new mongoose.Schema({
  title: String,
  message: String,
  reply: Array,
  timeStamp: Date,
  //poster: {type: Schema.Types.ObjectId, ref: 'User'}
});


mongoose.model('Message', MessageSchema);
mongoose.model('User', UserSchema);
// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/awf247';
}
mongoose.connect(dbconf);
