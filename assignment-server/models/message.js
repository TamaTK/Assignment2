const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel', required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['message', 'join', 'leave'], default: 'message' } // New field
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
