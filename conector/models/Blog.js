const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//blog model
const BlogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
      type: String
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes :[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);
