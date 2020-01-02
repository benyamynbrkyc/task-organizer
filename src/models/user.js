const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes('password'))
          throw new Error('Password cannot contain "password"');
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  { timestamps: true }
);

user_schema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
});

user_schema.methods.toJSON = function() {
  const user = this;
  const user_object = user.toObject();

  delete user_object.password;
  delete user_object.tokens;
  delete user_object.avatar;

  return user_object;
};

// user
user_schema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisisasecretkey');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// User
user_schema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login');

  return user;
};

// hash plain text pass before saving
user_schema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// delete user tasks when user is removed
user_schema.pre('remove', async function(next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model('User', user_schema);

module.exports = User;
