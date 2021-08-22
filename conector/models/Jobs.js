const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Job model
const JobSchema = new Schema({
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  des: {
    type: String,
    required: true
  },
  name: {
      type: String
  },
  avatar: {
      type: String
  },
  applicants: [
      {
          user: {
              type: Schema.Types.ObjectId,
              ref: 'User'
          },
          text: {
            type: String,
            required: true
          },
          urls: {
              type: String,
              required: true
          },
          name: {
              type: String
          },
          avatar: {
              type: String
          },
          date: {
              type: Date,
              default: Date.now
          }
      }
  ],
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = Jobs = mongoose.model('job', JobSchema);
