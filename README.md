# Catgram Full-Stack App
This is a full-stack application that allows users to publish their cat photos to a communal page.
Upload the photo, title it, give it a description and hit that "Post your cat" button! Voila! The cats are now on screen. 
Wait... That's not a cat, this isn't your swamp!

https://github.com/user-attachments/assets/20e59588-fbc8-4e11-b5b7-2bf88f29ffba

## How It's Made:
Catgram is built using the following technologies:

- **Node.js**: Utilized for server-side development.
- **JavaScript (JS)**: Employed for both client and server-side functionality.
- **MongoDB**: Used as the database to store unique user and movie data.
The core functionality is implemented on the server side using CRUD (Create, Read, Update, Delete) operations, enabling the handling of user ratings and movie specific data. On the client side, event listeners are employed. Users initiate CRUD functions by filling out forms and clicking buttons on the interface.

**Key Packages Used:**
- **express**: Provides a framework for building the web application.
- **multer**: Easily uploads and retrieves media data.

## What I Learned
- **Multer** to store user and movie specific data
- **Code Organization** to clearly route client and server side data

## Have fun!
Interact and play with this full-stack app [[here](https://catgram-716r.onrender.com/)]! If you would like to download my code and connect your own MongoDB databse to it make an .env file in root with this format:
```
DB_STRING = yourDBString
PORT = port of choice!
```
