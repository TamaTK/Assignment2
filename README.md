# Assignment Phase 2 3813
This assignment is for Software Frameworks 3813ICT. The following documentation outlines my implementation. 
Imagine a simple chat platform where users can communicate in real-time, similar to platforms like Slack or Discord however with much more simplicity. On this platform, users can create groups, similar to chat rooms, and within these groups, they can create channels for specific topics. For example, a group might be "Science Enthusiasts", and within that group, there might be channels like "Physics", "Biology", and "Chemistry". Users can send text messages, video messages, and even share images in these channels. The system will use modern technologies like MongoDB for efficient data storage, and sockets for real-time communication. Different users have different permissions based on their roles, ensuring a structured and controlled environment.

# Organisation of Git Repo
As soon as there is a modular, working change to the assignment,
I push and commit changes to the repo on GitHub. I have used branches in the instance of when the modular change is not working because another component, service, or something modular is required to fix an error.

# Angular Architecture (Components, Services, Routes, Models)
Models:
 user,
 role,
 group,
 channel

Components:
 login
 groups
 channels
 user-management
 group-management
 channel-management

# Data Structures (Client and Server Side)
- **User**:
  - Backend: [User Model (Server)](https://github.com/TamaTK/Assignment2/blob/master/assignment-server/models/user.js)
  - Frontend: [User Model (Client)](https://github.com/TamaTK/Assignment2/blob/master/src/app/models/user.ts)
- **Group**:
  - Backend: [Group Model (Server)](https://github.com/TamaTK/Assignment2/blob/master/assignment-server/models/group.js)
  - Frontend: [Group Model (Client)](https://github.com/TamaTK/Assignment2/blob/master/src/app/models/group.ts)
- **Channel**:
  - Backend: [Channel Model (Server)](https://github.com/TamaTK/Assignment2/blob/master/assignment-server/models/channel.js)
  - Frontend: [Channel Model (Client)](https://github.com/TamaTK/Assignment2/blob/master/src/app/models/channel.ts)
- **Message**: [Message Model (Server)](https://github.com/TamaTK/Assignment2/blob/master/assignment-server/models/message.js)
- **Role**: [Role Model (Client)](https://github.com/TamaTK/Assignment2/blob/master/src/app/models/role.ts)

# List of server side routes, parameters, return values and purpose

# Interaction between client and server
