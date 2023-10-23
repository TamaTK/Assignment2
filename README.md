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
## Data Structures

### 1. **User**

#### Backend Representation:

- **username**: 
  - **Type**: String
  - **Description**: Represents the user's name. It is unique for each user.
  
- **email**: 
  - **Type**: String
  - **Description**: Represents the user's email address. It is unique for each user.
  
- **password**: 
  - **Type**: String
  - **Description**: Represents the user's password. This is stored in a hashed format for security.
  
- **roles**: 
  - **Type**: Array of Strings
  - **Description**: Represents the roles a user can have. Possible values include `chatUser`, `groupAdmin`, and `superAdmin`.
  
- **groups**: 
  - **Type**: Array of Object IDs
  - **Description**: References the groups the user is a part of.
  
- **profilePic**: 
  - **Type**: String
  - **Description**: Represents the user's profile picture (if any).

#### Frontend Representation:

- **id**: 
  - **Type**: String
  - **Description**: Represents the MongoDB Object ID for the user.
  
- **username**: 
  - **Type**: String
  - **Description**: Represents the user's name.
  
- **email**: 
  - **Type**: String
  - **Description**: Represents the user's email address.
  
- **roles**: 
  - **Type**: Array of Strings
  - **Description**: Represents the roles a user can have.
  
- **groups**: 
  - **Type**: Array of `GroupModel` objects
  - **Description**: Represents the groups the user is a part of.

### 2. **Group**

#### Backend Representation:

- **name**: 
  - **Type**: String
  - **Description**: Represents the group's name. It is unique for each group.
  
- **admins**: 
  - **Type**: Array of Object IDs
  - **Description**: References the admin users of the group.
  
- **members**: 
  - **Type**: Array of Object IDs
  - **Description**: References the members of the group.
  
- **channels**: 
  - **Type**: Array of Object IDs
  - **Description**: References the channels within the group.

#### Frontend Representation:

- **id**: 
  - **Type**: Number
  - **Description**: Represents the group's ID.
  
- **name**: 
  - **Type**: String
  - **Description**: Represents the group's name.
  
- **admins**: 
  - **Type**: Array of `UserModel` objects
  - **Description**: Represents the admin users of the group.
  
- **channels**: 
  - **Type**: Array of `ChannelModel` objects
  - **Description**: Represents the channels within the group.
  
- **members**: 
  - **Type**: Array of `UserModel` objects
  - **Description**: Represents the members of the group.

### 3. **Channel**

#### Backend Representation:

- **name**: 
  - **Type**: String
  - **Description**: Represents the channel's name.
  
- **group**: 
  - **Type**: Object ID
  - **Description**: References the group the channel belongs to.

#### Frontend Representation:

- **id**: 
  - **Type**: Number
  - **Description**: Represents the channel's ID.
  
- **name**: 
  - **Type**: String
  - **Description**: Represents the channel's name.
  
- **groupId**: 
  - **Type**: Number
  - **Description**: Represents the ID of the group the channel belongs to.
  
- **members**: 
  - **Type**: Array of `UserModel` objects
  - **Description**: Represents the members of the channel.

### 4. **Message**

#### Backend Representation:

- **content**: 
  - **Type**: String
  - **Description**: Represents the content of the message.
  
- **sender**: 
  - **Type**: Object ID
  - **Description**: References the user who sent the message.
  
- **channel**: 
  - **Type**: Object ID
  - **Description**: References the channel where the message was sent.
  
- **timestamp**: 
  - **Type**: Date
  - **Description**: Represents when the message was sent.

### 5. **Role**

#### Frontend Representation:

- **id**: 
  - **Type**: Number
  - **Description**: Represents the role's ID.
  
- **name**: 
  - **Type**: String
  - **Description**: Represents the role's name. Possible values include "Super Admin", "Group Admin", and "Chat User".

# List of server side routes, parameters, return values and purpose

# Interaction between client and server
