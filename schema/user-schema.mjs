import mongoose from 'mongoose';
// import * as mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', UserSchema);