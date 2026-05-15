# iNotebook - Personal Blog Management System

A full-stack web application for managing personal blogs/notes with user authentication, search functionality, and real-time filtering. Built with React.js frontend and Node.js/Express.js backend with MongoDB database.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Blog Management**: Create, read, update, and delete personal blogs
- **Search & Filter**: Real-time search by title/description and filter by tags
- **Responsive Design**: Modern, mobile-friendly interface
- **Time Tracking**: Display publication time with smart formatting
- **Tag System**: Organize blogs with custom tags
- **Real-time Updates**: Instant UI updates for all operations

## 🛠️ Tech Stack

### Frontend
- **React.js** (v19.1.0) - UI framework
- **React Router DOM** (v7.6.0) - Client-side routing
- **Bootstrap** - CSS framework for styling
- **Font Awesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.1.0) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.14.2) - MongoDB object modeling
- **JWT** (v9.0.2) - JSON Web Token authentication
- **bcryptjs** (v3.0.2) - Password hashing
- **CORS** (v2.8.5) - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd inotebook
```

### 2. Install Dependencies

Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the connection string in `backend/db.js`

### 4. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cd backend
touch .env
```

Add the following environment variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/inotebook
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inotebook

# JWT Secret (generate a strong secret key)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 5. Run the Application

#### Option A: Run Both Frontend and Backend Simultaneously
```bash
npm run both
```

#### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or
nodemon index.js
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
inotebook/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AddNote.js
│   │   ├── Alert.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── NoteItem.js
│   │   ├── Notes.js
│   │   ├── SearchBar.js
│   │   └── Signup.js
│   ├── context/
│   │   └── notes/
│   │       ├── noteContext.js
│   │       └── NoteState.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── backend/
│   ├── models/
│   │   ├── Notes.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── middleware/
│   │   └── fetchUser.js
│   ├── db.js
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/createuser` - Register new user
- `POST /api/auth/login` - User login

### Notes/Blogs
- `GET /api/notes/fetchallnotes` - Get all user's notes
- `POST /api/notes/addnote` - Create new note
- `PUT /api/notes/updatenote/:id` - Update note
- `DELETE /api/notes/deletenote/:id` - Delete note

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage and automatically included in API requests.

## 🎨 Features Overview

### Search & Filter
- **Real-time Search**: Search blogs by title or description
- **Tag Filtering**: Filter blogs by specific tags
- **Combined Filtering**: Use search and tag filter together

### Blog Management
- **Create Blogs**: Add new blogs with title, description, and tags
- **Edit Blogs**: Update existing blog content
- **Delete Blogs**: Remove blogs with confirmation
- **Time Tracking**: See when each blog was published

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Instant UI feedback for all operations
- **Smart Time Display**: Shows relative time for recent posts

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `backend/db.js`
   - Verify database permissions

2. **Port Already in Use**
   - Change port in `backend/index.js` (line 6)
   - Update frontend API calls if needed

3. **CORS Issues**
   - Ensure CORS is properly configured in backend
   - Check if frontend and backend are running on correct ports

4. **JWT Token Issues**
   - Clear localStorage and login again
   - Check JWT_SECRET in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Modala Swathi**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB for the robust database solution
- Bootstrap for the responsive UI framework
- Font Awesome for the beautiful icons

---

**Happy Blogging! 📝✨**