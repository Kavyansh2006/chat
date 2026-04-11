# Modern Real-time Chat Application

A beautifully designed, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. This project features a stunning modern user interface with glassmorphism, dark mode, and smooth animations, making it an excellent showcase of full-stack capabilities.

## ✨ Features
- **Real-time Messaging**: Instant message delivery and broadcasting using Socket.io.
- **Premium UI/UX**: Eye-catching "glassmorphic" design with a dark theme, custom scrollbars, and vibrant accents.
- **Active Users Status**: Dynamic sidebar showing users currently online.
- **REST API Integration**: Custom Express API integrated with MongoDB for data persistence.
- **Smooth Animations**: High-quality CSS keyframe animations for messages and form interactions.

## 🚀 Technologies Used
- **Frontend**: React.js (via Vite), Modern CSS3 (CSS Variables, Backdrop-filters)
- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.io
- **Database**: MongoDB

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) instance running locally or via MongoDB Atlas

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd chat
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   *Note: Create a `.env` file in the `backend` directory with your `MONGO_URI`.*
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   *Note: Ensure your `.env` or variable `VITE_BACKEND_URL` points to `http://localhost:<YOUR_BACKEND_PORT>`.*
   ```bash
   npm run dev
   ```

4. Open your browser to the URL provided by Vite (usually `http://localhost:5173`) and start chatting!

## 📸 Preview
*(Add a screenshot of your beautiful new UI here later!)*

## 📄 License
This project is open-source and available under the MIT License.
