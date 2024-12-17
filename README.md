### Messenger

## Application Description
The application facilitates easy communication among users. For this communication, auxiliary features are designed, including profile settings, pinning/unpinning chats, and blocking inappropriate users.

## Functionality
- Login: After opening the application, the user can log in by entering their username and the correct password.
- Registration: Each new user can register with a unique four-character username and a password with more than six characters. Additional information such as the user's name and surname are required.
- Home Page: The main page lists all the chats the current user is a part of. For each chat, the user's name, partner's surname, avatar, the last message in the chat, and the number of unread messages by the user are displayed.
- Pinning a Chat: If a user wishes, they can open a context menu on one of the chats and pin it. This chat will then appear at the top of the page with priority.
- Blocking Users: If a user does not wish to receive messages from a specific user, they can block the chat with that user. They can open the context menu on a chat and select block, causing the chat to disappear from the page.
- Profile Changes: If the user's name, surname, or password needs to be changed, they can click on their avatar, enter the new details, and are required to provide the current correct password.
- Sending Messages: Clicking on any chat takes the user to the chat page where they can send and receive messages from their partner. They can type a message in the box and press Enter or click the “Send” button.

## Entity Relationship Diagram
![image](https://github.com/user-attachments/assets/23e3e24d-de46-4cc6-b67e-20bc762a7631)

## Database

### Logical schema
![image](https://github.com/user-attachments/assets/9318a696-2abf-4a6c-b1ac-0120e88b1c5d)

### Physical model
![image](https://github.com/user-attachments/assets/7cc58f81-2739-45d6-a46f-8723fd820af4)

## Screen Design
### Login Screen:
![image](https://github.com/user-attachments/assets/b75d36be-adde-4e84-9739-87f0d87bbaee)

### Registration Screen:
![image](https://github.com/user-attachments/assets/9207f42a-d4ac-463a-b28f-ee4c729ec502)

### Main Page Screen:
![image](https://github.com/user-attachments/assets/5e72c4a4-6f0b-42a3-9292-02949d93f280)

### Profile Change Popup:
![image](https://github.com/user-attachments/assets/4023742e-4d7a-4729-96f6-df735bb9e2d2)

### Context Menu Screen:
![image](https://github.com/user-attachments/assets/8a751b0e-d445-4e7f-a287-ad501d5728b3)

### Chat Screen:
![image](https://github.com/user-attachments/assets/ee2cf7f0-24d3-47a6-89e3-ef41e57f104c)

## Communication Protocol
Server-client applications communicate using a text-based protocol encoded in UTF-8. Each message is a text line, with data elements separated by spaces and terminated by a newline character. The first element of each message represents the task name required to complete the task, followed by the subsequent elements representing the individual data.

The server can return a response to the client for each message if necessary, containing a command name corresponding to frontend commands.

- Command Name: A text line for naming and distinguishing commands.
- Data: Various data packets, specified for specific tasks.

### Command Descriptions

| Command Name | Description | Example | Possible Server Responses |
|---------------|-------------|---------|---------------------------|
| **REGISTER** | Verifies data received and if it is correct, registers a new user, sets their nickname, full name, and login password. | `REGISTER testUserJohn Johnson123456` | `SUCCESSREGISTER 714b24c7-e001-4710-aff9-faef3cceb911`<br>`ERROR You did not fill the form properly`<br>`ERROR Password should contain at least 6 characters`<br>`ERROR Username should contain at least 4 characters`<br>`ERROR This username is already taken` |
| **LOGIN** | Verifies user-provided data; if the user with that username exists and enters the correct password, logs them in or returns their identification number. | `LOGIN testUser123456` | `SUCCESSLOGIN 714b24c7-e001-4710-aff9-faef3cceb911`<br>`ERROR You did not fill the form properly`<br>`ERROR User does not exist`<br>`ERROR Wrong password` |
| **FETCH NAME** | Returns the full name based on the user's identification number. If such a user does not exist, returns `UnknownUnknown`. | `FETCHNAME 714b24c7-e001-4710-aff9-faef3cceb911` | `FETCHNAME John Johnson`<br>`FETCHNAME Unknown Unknown` |
| **FETCH COLOR** | Returns the avatar color based on the user's identification number. If such a user does not exist, returns a standard color (blue). | `FETCHCOLOR 714b24c7-e001-4710-aff9-faef3cceb911` | `FETCHCOLOR F2C4DE` |
| **FETCH USERS** | Returns all full names of users found based on the pattern, i.e., part of their username, name, or surname. | `FETCHUSERS jo` | `FETCHUSERS John Johnson 714b24c7-e001-4710-aff9-faef3cceb911` |
| **FETCH PARTNER DATA** | Returns a line of data about the partner with whom the user currently has an open chat. | `FETCHPARTNERDATA 714b24c7-e001-4710-aff9-faef3cceb911` | `FETCHPARTNERDATA John Johnson F2C4DE` |
| **SEND** | Sends a message by storing it in the database with the sender and recipient’s identification numbers. | `SEND 714b24c7-e001-4710-aff9-faef3cceb911 c1dfd651-eff7-4113-9931-90780be76075 Ahoj jak se mas` | (No response) |
| **FETCH MESSAGES** | Returns all messages belonging to the specified chat between two users. For obtaining these messages, spaces in the text messages are replaced with a special symbol that the client also recognizes. | `FETCHMESSAGES 714b24c7-e001-4710-aff9-faef3cceb911 c1dfd651-eff7-4113-9931-90780be76075` | `FETCHMESSAGES 5c4eff24-be95-42a8-9e76-280bc0db9032 714b24c7-e001-4710-aff9-faef3cceb911 c1dfd651-eff7-4113-9931-90780be76075 Ahoj / jak / se / mas?`<br>`FETCHMESSAGES 5c4eff24-be95-42a8-9e76-280bc0db9032 Dobre` |
| **FETCH DIALOGUES** | Returns all chats of the user that they have access to. As chat data is passed: partner ID, name, surname, hex color code, last message, number of unread messages, and if the chat is pinned. | `FETCHDIALOGUES c1dfd651-eff7-4113-9931-90780be76075` | `FETCHDIALOGUES 714b24c7-e001-4710-aff9-faef3cceb911 John Johnson F2C4DE Ahoj / jak / se / mas? 0 false` |
| **READ MESSAGES** | Marks all received messages by the user in a specific chat as read. | `READMESSAGES 714b24c7-e001-4710-aff9-faef3cceb911` | (No response) |
| **PIN** | Pins the chat with the user, marking their relationship as pinned. | `PIN 714b24c7-e001-4710-aff9-faef3cceb911 c1dfd651-eff7-4113-9931-90780be76075` | (No response) |
| **UNPIN** | Unpins the chat with the user, marking their relationship as unpinned. | `UNPIN 714b24c7-e001-4710-aff9-faef3cceb911 c1dfd651-eff7-4113-9931-90780be76075` | (No response) |
| **BLOCK** | Blocks the chat with the user, marking their relationship as blocked. | `BLOCK 714b24c7-e001-4710-aff9-faef3cceb911 c1dfd651-eff7-4113-9931-90780be76075` | (No response) |
| **UPDATE** | This command verifies the new data about the user’s profile. If it is correct, it updates it in the database. If any of the fields are not provided, it does not update. | `UPDATE c1dfd651-eff7-4113-9931-90780be76075 Peter Peterson 654321` | `UPDATE ERROR Fill the form properly`<br>`UPDATE ERROR Password doesn't contain 6 chars`

## Application Architecture
### Description:
1. **Desktop Application:**
   - Users download the desktop application, which requires Java to be installed.
   - It is developed using the JavaFx library and launches the frontend application in an internal browser.
   
2. **Frontend Application:**
   - Upon launching the application, the frontend application loads from the sources, functioning through HTML, CSS, and JS.
   - It is developed using Node.js and TypeScript, which is then compiled into JavaScript to run in a browser.

3. **Backend Webserver:**
   - The client attempts to connect to this server. Once connected, the server processes the sent data, returns the processed data, and the application forwards it to the frontend.
   - The backend server is developed in Java and functions using socket connections.

## Storage Structure
The storage will consist of three directories for the three different applications:
- **client** - Folder for the desktop application for the user
  - **main/java** - Main project folder
  - **resources/html** - Folder for the frontend application
    - **assets** - Folder for visual elements of the project: images, styles
    - **build** - Folder for compiled JS code
    - **dev** - Folder for TypeScript development
- **register** - Folder for the login module
- **dialogues** - Folder for user communication module
- **messenger** - Folder for the main page module
- **notifications** - Folder for the notifications module
- **enums** - Folder for storing enums
- **utils** - Folder for storing helper functions
  - **dist** - Folder for compressed JS code
  - **pages** - Folder for storing static HTML pages
- **game** - Folder for game pages
- **lobby** - Folder for waiting room pages
- **server** - Folder for the backend server
  - **java** - Main project folder
    - **controllers** - Folder for storing application controllers
    - **commands** - Folder for storing command classes
    - **entities** - Folder for storing object/entity classes used in the application
    - **services** - Folder for storing services handling commands
    - **enums** - Folder for storing enums
    - **database** - Folder for storing repository classes
  - **templates** - Folder for storing command templates
  - **utils** - Folder for storing helper classes
- **test** - Folder for storing unit tests

## UseCase Diagram
![image](https://github.com/user-attachments/assets/c1fd7449-1103-4bbf-befe-be62ea9b2eca)



