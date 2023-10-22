const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, required: true },
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  channels: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
