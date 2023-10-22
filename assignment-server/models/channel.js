const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: { type: String, required: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true }
});

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;
