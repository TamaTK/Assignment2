# Assignment Phase 2 3813
This assignment is for Software Frameworks 3813ICT. The following documentation outlines my implementation. 
Imagine a simple chat platform where users can communicate in real-time, similar to platforms like Slack or Discord however with much more simplicity. On this platform, users can create groups, similar to chat rooms, and within these groups, they can create channels for specific topics. For example, a group might be "Science Enthusiasts", and within that group, there might be channels like "Physics", "Biology", and "Chemistry". Users can send text messages, video messages, and even share images in these channels. The system will use modern technologies like MongoDB for efficient data storage, and sockets for real-time communication. Different users have different permissions based on their roles, ensuring a structured and controlled environment.

# Organisation of Git Repo
As soon as there is a modular, working change to the assignment,
I push and commit changes to the repo on GitHub. I have used branches in the instance of when the modular change is not working because another component, service, or something modular is required to fix an error.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

#### Ensure you have [Node.js](https://nodejs.org/) installed.
#### Install [Angular CLI](https://cli.angular.io/) globally:
   ```bash
   npm install -g @angular/cli
```
### Installation 
    ```bash
    git clone https://github.com/TamaTK/Assignment2.git
    cd Assignment2
```

### Install Backend Dependencies
#### Navigate to the server directory and install the necessary packages
    ```bash
    cd assignment-server
    npm install
    ``` 
### Install Frontend Dependencies
#### Navigate to the frontend directory and install the necessary packages:
```bash 
    cd ../
    npm install
```

### Running the Application
```bash
    npm start
    npm serve
```

    

    
## Angular Architecture

### Components

#### 1. **AppComponent**
- The root component of the application.
- Contains the main view of the application.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/app.component.ts)

#### 2. **LoginComponent**
- Provides the login functionality.
- Uses the `AuthService` to authenticate users.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/login/login.component.ts)

#### 3. **GroupsComponent**
- Displays the list of groups.
- Uses the `GroupService` to fetch all groups.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/groups/groups.component.ts)

#### 4. **ChannelsComponent**
- Displays the list of channels within a group.
- Provides functionality to create a channel and join a channel.
- Uses the `ChannelService` and `SocketService` for various operations.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/channels/channels.component.ts)

#### 5. **GroupManagementComponent**
- Provides the functionality to create a new group.
- Uses the `GroupService` to create a group.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/group-management/group-management.component.ts)

#### 6. **UserManagementComponent**
- Currently, this component doesn't have any specific functionality implemented.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/user-management/user-management.component.ts)

### Services

#### 1. **AuthService**
- Provides authentication-related functionalities.
- Contains methods for user login and fetching the logged-in user's details.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/services/auth.service.ts)

#### 2. **ChannelService**
- Provides functionalities related to channels.
- Contains methods to fetch channels of a group and create a new channel.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/services/channel.service.ts)

#### 3. **GroupService**
- Provides functionalities related to groups.
- Contains methods to create a group, fetch all groups, join a group, create a channel within a group, get channels of a group, and get user groups.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/services/group.service.ts)

#### 4. **SocketService**
- Provides socket-related functionalities.
- Contains methods to join a channel, send a message, receive a message, and listen for user join/leave notifications.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/services/socket.service.ts)

#### 5. **LocalStorageService**
- Currently, this service doesn't have any specific functionality implemented.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/services/local-storage.service.ts)

#### 6. **UserService**
- Currently, this service doesn't have any specific functionality implemented.
[View Code](https://github.com/TamaTK/Assignment2/blob/master/src/app/services/user.service.ts)

### Routes

Based on the `AppRoutingModule`, the following routes are defined:

- **/login** - Navigates to the `LoginComponent`.
- **/groups** - Navigates to the `GroupsComponent`.
- **/channels/:groupId** - Navigates to the `ChannelsComponent` with a specific group ID.
- **/user-management** - Navigates to the `UserManagementComponent`.
- **/group-management** - Navigates to the `GroupManagementComponent`.
- **/** - Redirects to the `/login` route.

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