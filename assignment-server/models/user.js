const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: ['chatUser', 'groupAdmin', 'superAdmin'] }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  profilePic: String
});

// Hash the password before saving it to the database
userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

});

const User = mongoose.model('User', userSchema);
module.exports = User;
