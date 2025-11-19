TaskCheck - Full Stack Todo Application 📝

A modern, full-stack todo application built with the MERN stack (MongoDB, Express, React, Node.js). TaskCheck provides a clean and intuitive interface for managing your daily tasks with features like adding, editing, completing, and deleting todos.
![TaskCheck-app](/TaskCheck-app.png)
![mongodb-cluster](/mongodb-cluster.png)

✨ Features
- Create Tasks: Add new todos with a simple form interface
- Edit Tasks: Inline editing with save and cancel options
- Complete Tasks: Mark tasks as completed with visual checkmarks
- Delete Tasks: Remove tasks you no longer need
- Persistent Storage: All todos are stored in MongoDB
- Responsive Design: Beautiful gradient UI that works on all devices
- Real-time Updates: Immediate UI updates after any CRUD operation
  
🛠️ Tech Stack
Frontend
- React 18: Modern React with Hooks (useState, useEffect)
- Axios: HTTP client for API requests
- Tailwind CSS: Utility-first CSS framework for styling
- Lucide React: Beautiful icon library (SquarePen, Trash, X, SpellCheck, Check)
 
 Backend
-Node.js: JavaScript runtime
-Express: Web application framework
-MongoDB: NoSQL database
-Mongoose: MongoDB object modeling

📂 Project Structure
todo-app/

├── frontend/

│   ├── src/

│   │   ├── App.jsx          # Main React component

│   │   ├── main.jsx         # React entry point

│   │   └── index.css        # Tailwind CSS imports

│   └── dist/                # Production build

├── backend/

│   ├── server.js            # Express server setup

│   ├── routes/

│   │   └── todo.js          # Todo API routes

│   ├── models/

│   │   └── todo.model.js    # Todo Mongoose schema

│   └── config/

│       └── db.js            # MongoDB connection

└── README.md

🚀 Getting Started
Prerequisites
-Node.js (v14 or higher)
-MongoDB (local installation or MongoDB Atlas account)
-npm or yarn

Installation
1. Clone the repository
git clone 
cd todo-app
2. Install backend dependencies
npm install
3.Install frontend dependencies
cd frontend
   npm install
   cd ..
4.Environment Variables
Create a .env file in the root directory:
MONGO_URI=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
5.Run the application
Development mode:
# Terminal 1 - Run backend
   npm run dev

   # Terminal 2 - Run frontend
   cd frontend
   npm run dev
6.Production mode:
# Build frontend
   cd frontend
   npm run build
   cd ..

   # Run server
   NODE_ENV=production npm start
   
📡 API Endpoints
MethodEndpointDescription
GET/api/todosFetch all todos
POST/api/todosCreate a new todo
PATCH/api/todos/:id
Update todo text or completion status
DELETE/api/todos/:idDelete a todo

API Request Examples
Create a todo:
POST /api/todos
{
  "text": "Buy groceries"
}
Update a todo:
PATCH /api/todos/123abc
{
  "completed": true
}

💾 Database Schema
{
  text: String (required),
  completed: Boolean (default: false),
  timestamps: true (createdAt, updatedAt)
}

🎨 UI Components Breakdown
-Main App Component (App.jsx)
-State Management:
1.newTodo: Stores input value for new tasks
2.todos: Array of all todo items
3.editingTodo: ID of the todo currently being edited
4.editedText: Temporary text value during editing

Key Functions:
1.addTodo(e): Prevents form submission reload, validates input, sends POST request to create a new todo, updates local state, and clears input field.
2.fetchTodos(): Retrieves all todos from the database on component mount using GET request.
3.startEditing(todo): Activates inline editing mode for a specific todo by setting its ID and current text.
4.saveEdit(id): Sends PATCH request with updated text, updates the todo in local state, and exits editing mode.
5.deleteTodo(id): Sends DELETE request to remove todo and filters it out from local state.
6.toggleTodo(id): Finds the todo, sends PATCH request to toggle completion status, and updates local state.

Styling Features:
-Gradient Background: Cyan to purple gradient for modern look
-Card Design: White rounded card with shadow for content container
-Interactive Buttons: Hover effects and color transitions
-Inline Editing: Seamless transition between view and edit modes
-Status Indicators: Visual checkmarks for completed tasks

🎯 Key Features Explained
-Adding Todos
-Users type in the input field and click "Add Task" or press Enter. The form submission is handled by addTodo(), which validates the input and communicates with the backend API.
-Editing Todos
-Clicking the edit icon (SquarePen) activates inline editing mode. The todo text becomes an editable input field with save (SpellCheck) and cancel (X) buttons. Changes are saved via PATCH request.
--Completing Todos
-Clicking the circular checkbox toggles the completion status. Completed todos show a green background with a checkmark icon. The state change is persisted to the database.
-Deleting Todos
-The trash icon removes todos permanently. A DELETE request is sent to the backend, and the todo is immediately removed from the UI.

🔒 Production Deployment
The app is configured for production deployment with:
-Static file serving from the built React app
-Fallback routing to handle client-side routing
-Environment-based configuration
-MongoDB connection with error handling

🐛 Error Handling
All API calls include try-catch blocks with console logging for debugging. Error states are caught and logged but could be enhanced with user-facing error messages.

📝 License
This project is open source and available under the MIT License.

👤 Author
Sameeha Taha -Feel free to reac out!

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
