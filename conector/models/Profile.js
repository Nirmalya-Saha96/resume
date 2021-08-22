const mongoose = require('mongoose');

//profile model
const ProfileSchema =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        vedioid: {
            type: String
        },
        colaborateid: {
            type: String
        },
        chatid: {
            type: String
        }
    },
    projects: [
        {
            title: {
                type: String,
                required: true
            },
            about: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            },
        }
    ],
    lisense: [
        {
            title: {
                type: String,
                required: true
            },
            organization: {
                type: String,
                required: true
            },
            credential: {
                type: String,
                required: true
            },
        }
    ],
    quickLinks: [
        {
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            },
        }
    ],
    awards: [
        {
            title: {
                type: String,
                required: true
            },
            des: {
                type: String,
                required: true
            },
        }
    ],
    posts: [
      {
        text: {
          type: String,
          required: true
        },
        githuburl: {
          type: String,
          required: true
        }
      }
    ],
    jobs: [
      {
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
        }
      }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
