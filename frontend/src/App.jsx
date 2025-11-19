import { useEffect, useState } from "react";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { Trash } from 'lucide-react';
import { X } from 'lucide-react';
import { SpellCheck } from 'lucide-react';
import { Check } from 'lucide-react';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("error fetching todos: ", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const startEditing = (todo) => {
       setEditingTodo(todo._id)
       setEditedText(todo.text)
  }
  const saveEdit = async (id) => {
try{
  const response = await axios.patch(`/api/todos/${id}`,{
    text: editedText
  })
  setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
  setEditingTodo(null)
}catch(error){
   console.log("Error updated todo: ",error)
}
  }
  const deleteTodo  = async (id) => {
    try{
     await axios.delete(`/api/todos/${id}`)
     setTodos(todos.filter((todo) => todo._id !== id))
    }catch{
      console.log("error deleting todos:",error)
    }
  }
  const toggleTodo = async (id) => {
    try{
      const todo  = todos.find((t) => t._id === id)
      const response = await axios.patch(`/api/todos/${id}`,{
        completed : !todo.completed
      })
      setTodos(todos.map((t) =>t._id === id ? response.data : t))
    }catch(error){
         console.log("error loading todo:",error)
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from cyan-500 to-purple-400 flex items-center justify-center p-4">
      <div className="bg-white-500 rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-shadow-gray-800 mb-8 text-center">
          TaskCheck
        </h1>

        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border-gray-200 p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-600"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="what yours new task"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>

        <div className="mt-4">
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div key={todo._id}>
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border rounded border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-black shadow-innner"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        <button onClick={() => saveEdit(todo._id)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"><SpellCheck /></button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer" onClick={() => setEditingTodo(null)}><X /></button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                       <div className="flex items-center gap-x-4 overflow-hidden"><button onClick={() => toggleTodo(todo._id)} className={`shrink-0 h-6 w-6 border rounded-full fles items-center justify-center ${todo.completed?"bg-green-500 border-green-500" :"border-black hover:bg-purple-700"}`}>{todo.completed && <Check />}</button>
                        <span className="text-gray-800 font-medium truncate">{todo.text}</span></div>
                       <div className="flex gap-x-2">
                         <button className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200" onClick={() => startEditing(todo)}>
                          <SquarePen />
                        </button>
                        <button onClick={() => deleteTodo(todo._id)} className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200">
                          <Trash />
                        </button>
                       </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
