'use client'
import Todo from '@/Components/Todo';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  

  const fetchTodos = async () => {
    const response = await axios('/api');
    setTodoData(response.data.todos);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete('/api', {
      params: { mongoId: id }
    });
    toast.success(response.data.msg);
    fetchTodos();
  };

  const completeTodo = async (id) => {
    const response = await axios.put("/api", {}, {
      params: { mongoId: id }
    });
    toast.success(response.data.msg);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...form, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({ title: "", description: "" });
      await fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <>
      <h1 className="text-5xl py-4 text-center bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold shadow-lg">
        Task Management App
      </h1>

      <ToastContainer theme='dark' />
      
      {/* Form Section */}
      <form 
        onSubmit={onSubmitHandler} 
        className="flex flex-col gap-3 w-[80%] max-w-[600px] mt-12 p-6 mx-auto bg-white shadow-md rounded-lg"
      >
        <input 
          value={formData.title} 
          onChange={onChangeHandler} 
          type="text" 
          name="title" 
          placeholder="Enter Title" 
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        
        <textarea 
          value={formData.description} 
          onChange={onChangeHandler} 
          name="description" 
          placeholder="Enter description" 
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>

        <button 
          type="submit" 
          className="bg-orange-600 hover:bg-orange-700 py-3 px-5 text-white font-semibold rounded-md shadow-md transition duration-200"
        >
          Add Task
        </button>
      </form>

      {/* Table Section */}
      <div className="relative overflow-x-auto mt-12 w-[80%] mx-auto">
        <table className="w-full text-sm text-gray-600 bg-white shadow-md rounded-lg">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => (
              <Todo 
                key={item._id} 
                id={index} 
                title={item.title} 
                description={item.description} 
                complete={item.isCompleted} 
                mongoId={item._id} 
                deleteTodo={deleteTodo} 
                completeTodo={completeTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
