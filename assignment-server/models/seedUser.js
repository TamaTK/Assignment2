const mongoose = require('mongoose');
const User = require('./user'); // Adjust the path if needed

// Connect to the database
mongoose.connect('mongodb+srv://new:new@assignment1.onadgeh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', { useNewUrlParser: true, useUnifiedTopology: true });

const users = [
  {
    username: 'chatUser1',
    email: 'chatuser1@example.com',
    password: 'password123',
    roles: ['chatUser']
  },
  {
    username: 'groupAdmin1',
    email: 'groupadmin1@example.com',
    password: 'password123',
    roles: ['groupAdmin']
  },
  {
    username: 'superAdmin1',
    email: 'superadmin1@example.com',
    password: 'password123',
    roles: ['superAdmin']
  }
];

// Insert users into the database
User.insertMany(users)
  .then(docs => {
    console.log('Users inserted:', docs);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting users:', err);
    mongoose.connection.close();
  });
