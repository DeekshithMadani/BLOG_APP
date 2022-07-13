const mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/Blog_App';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var conn = mongoose.connection;

conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})
conn.on('error', (err) => { console.log(console.log(err)) });

//creating a blogsSchema
let blogsSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    uploadTime: {
        type: String,
        required: true
    },
    preface: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    starred: {
        type: Boolean,
        required: true
    },
    trash: {
        type: Boolean,
        required: true
    }
});

//creating Blog model
let blog = mongoose.model('blog', blogsSchema);

//exporing model
module.exports = blog;