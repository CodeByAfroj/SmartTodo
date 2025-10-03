
// import React, { useState, useEffect } from 'react';
// import axios from "axios";

// const Body = () => {
//   const [data, setData] = useState('');
//   const [email, setEmail] = useState('');
//   const [reminderDate, setReminderDate] = useState('');
//   const [info, setInfo] = useState([]);

//   const fetchTodos = () => {
//     axios.get('http://localhost:3000/api/view')
//       .then((res) => setInfo(res.data))
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleDelete = (todoId) => {
//     axios.delete(`http://localhost:3000/api/delete/${todoId}`)
//       .then(() => fetchTodos())
//       .catch((error) => console.log(error));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3000/api/add', { data,reminderDate,email})
//       .then(() => {
//         alert("To-do created");
//         setData('');
//         setReminderDate('');
//         fetchTodos();
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className='h-screen outline m-2 px-2 flex items-center justify-center'>
//       <div className='h-100 w-100 outline mt-1 p-2'>
//         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//           <label>Make your to-do</label>
//           <input 
//             type="text" 
//             value={data} 
//             onChange={(e) => setData(e.target.value)} 
//             className='bg-white text-gray-900 rounded-xl w-80 px-2' 
//           />

//           <label>Set Reminder</label>
//           <input 
//             type="datetime-local" 
//             value={reminderDate}
//             onChange={(e) => setReminderDate(e.target.value)}
//             className='bg-gray-500 text-gray-900 rounded-xl w-80 px-2' 
//           />



//            <input 
//             type="text" 
//             placeholder='Enter your Email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className='bg-white text-gray-900 rounded-xl w-80 px-2' 
//           />

//           <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Add To-do</button>
//         </form>

//         {info?.map((todo) => (
//           <div key={todo._id} className="flex justify-between items-center mt-2">
//             <div>
//               {todo.data}  
//               {todo.reminderTime && (
//                 <span className="text-sm text-gray-500 ml-2">
//                   ({new Date(todo.reminderTime).toLocaleString()})
//                 </span>
//               )}
//             </div>
//             <button 
//               onClick={() => handleDelete(todo._id)} 
//               className="bg-red-500 text-white px-2 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Body;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Body = () => {
//   const [data, setData] = useState("");
//   const [email, setEmail] = useState("");
//   const [reminderDate, setReminderDate] = useState("");
//   const [info, setInfo] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchTodos = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:3000/api/view")
//       .then((res) => setInfo(res.data))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleDelete = (todoId) => {
//     axios
//       .delete(`http://localhost:3000/api/delete/${todoId}`)
//       .then(() => fetchTodos())
//       .catch((error) => console.log(error));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!data.trim()) {
//       alert("⚠️ Please enter a todo task!");
//       return;
//     }
//     if (!email.trim() || !email.includes("@")) {
//       alert("⚠️ Please enter a valid email!");
//       return;
//     }

//     axios
//       .post("http://localhost:3000/api/add", { data, reminderDate, email })
//       .then(() => {
//         alert("✅ To-do created successfully");
//         setData("");
//         setReminderDate("");
//         setEmail("");
//         fetchTodos();
//       })
//       .catch((error) =>
//         console.error("Error creating todo:", error.response?.data || error.message)
//       );
//   };

//   return (
//     <div className="h-screen w-full bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-6 w-[450px]">
//         <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
//           📝 Smart To-Do with Reminders
//         </h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 text-gray-700">
//           <input
//             type="text"
//             placeholder="Enter your task..."
//             value={data}
//             onChange={(e) => setData(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             type="datetime-local"
//             value={reminderDate}
//             onChange={(e) => setReminderDate(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             type="email"
//             placeholder="Enter your email..."
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-2 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
//           >
//             ➕ Add To-do
//           </button>
//         </form>

//         {/* Loader */}
//         {loading && <p className="text-center text-gray-500">Loading...</p>}

//         {/* Todo List */}
//         <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
//           {info.length === 0 && !loading && (
//             <p className="text-gray-500 text-center">No todos yet. Add one!</p>
//           )}

//           {info.map((todo, index) => (
//             <motion.div
//               key={todo._id}
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm border"
//             >
//               <div>
//                 <p className="font-medium text-gray-800">{todo.data}</p>
//                 {todo.reminderDate && (
//                   <p className="text-sm text-gray-500">
//                     ⏰ {new Date(todo.reminderDate).toLocaleString()}
//                   </p>
//                 )}
//                 <p className="text-xs text-gray-400">📧 {todo.email}</p>
//               </div>
//               <button
//                 onClick={() => handleDelete(todo._id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
//               >
//                 Delete
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Body;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Body = () => {
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // ✅ for success/error messages

  const fetchTodos = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/view")
      .then((res) => setInfo(Array.isArray(res.data) ? res.data : []))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = (todoId) => {
    axios
      .delete(`http://localhost:3000/api/delete/${todoId}`)
      .then(() => {
        setMessage({ type: "success", text: "🗑️ Todo deleted" });
        fetchTodos();
      })
      .catch((error) => {
        setMessage({ type: "error", text: "❌ Error deleting todo" });
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.trim()) {
      setMessage({ type: "error", text: "⚠️ Please enter a todo task!" });
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setMessage({ type: "error", text: "⚠️ Please enter a valid email!" });
      return;
    }

    axios
      .post("http://localhost:3000/api/add", { data, reminderDate, email })
      .then(() => {
        setMessage({ type: "success", text: "✅ To-do created successfully" });
        setData("");
        setReminderDate("");
        setEmail("");
        fetchTodos();
      })
      .catch((error) =>
        setMessage({
          type: "error",
          text: `❌ Error creating todo: ${
            error.response?.data?.message || error.message
          }`,
        })
      );
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-[480px]">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          📝 Smart To-Do with Reminders
        </h1>

        {/* Status message */}
        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 text-gray-700">
          <input
            type="text"
            placeholder="Enter your task..."
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
          >
            ➕ Add To-do
          </button>
        </form>

        {/* Loader */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Todo List */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {info.length === 0 && !loading && (
            <div className="text-gray-500 text-center">
              <p>No todos yet. Add one! 🎉</p>
            </div>
          )}

          {info.map((todo, index) => {
            const isUpcoming =
              todo.reminderDate &&
              new Date(todo.reminderDate) - new Date() < 24 * 60 * 60 * 1000; // < 24h

            return (
              <motion.div
                key={todo._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex justify-between items-center p-3 rounded-lg shadow-sm border ${
                  isUpcoming ? "bg-yellow-100 border-yellow-400" : "bg-gray-50"
                }`}
              >
                <div>
                  <p className="font-medium text-gray-800">{todo.data}</p>
                  {todo.reminderDate && (
                    <p className="text-sm text-gray-600">
                      ⏰ {new Date(todo.reminderDate).toLocaleString()}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">📧 {todo.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;
