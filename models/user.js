import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    minlength: 5,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
