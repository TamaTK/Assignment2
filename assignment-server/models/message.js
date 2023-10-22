const messageSchema = new Schema({
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel', required: true },
    timestamp: { type: Date, default: Date.now }
  });
  
  const Message = mongoose.model('Message', messageSchema);
  