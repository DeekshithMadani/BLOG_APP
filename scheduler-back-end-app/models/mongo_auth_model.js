const mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/Blog_App';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var conn = mongoose.connection;

conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})
conn.on('error', (err) => { console.log(console.log(err)) });

//creating a authschema
let authSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true,
        unique: true
    },
    pwd: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required:true
    }
});

//creating auth model
let Auth = mongoose.model('Auth', authSchema);

//exporing model
module.exports = Auth;