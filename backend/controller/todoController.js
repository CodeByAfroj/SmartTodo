// import e from "express";
// import Todo from "../models/todoModels.js";
// import { scheduleReminder } from "../scheduler.js";


// export const create = async (req, res) => {
//   try {
//     const { data, reminderDate,email } = req.body;
     
//     const todo = new Todo({
//       data: `${data}`,
//       reminderDate: reminderDate ? new Date(reminderDate) : null,
//       email:email
//     });

//     await todo.save();

//     // Schedule reminder with node-cron
//     if (todo.reminderDate) {
//       scheduleReminder(Todo);
//     }

//     res.status(201).json({ message: "Todo created", todo });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error while creating todo",
//       error: error.message
//     });
//   }
// };




// export const showAll = async (req,res)=>{
//       try {
//              const show =await Todo.find();
//              if(show.length == 0 ){
//                   console.log("No To Do");
//              }
//              return res.status(201).json(show);
//       } catch (error) {
//             return res.json({
//             message:"Error during view a  todo",
//             error:error.message
//         })
//       }
// }


// export const del = async (req,res)=>{
//         try {
//             const {id}= req.params;
//         const todoExist = await Todo.find({_id:id})
//         if(!todoExist){
//             return res.json({message:"todo Not found"})
//         }
//           await Todo.findByIdAndDelete(id,req.body,{new:true})
//         return res.status(201).json({message:"deleted successfully"})
            
//         } catch (error) {
//             return res.json({
//                   error:error.message
//             })
//         }
// }




import Todo from "../models/todoModels.js";
import { scheduleReminder } from "../scheduler.js";

// Create Todo
// export const create = async (req, res) => {
//   try {
//     const { data, reminderDate, email } = req.body;

//     if (!data || !email) {
//       return res.status(400).json({ message: "Task and email are required" });
//     }

//     const todo = new Todo({
//       data,
//       reminderDate: reminderDate ? new Date(reminderDate) : null,
//       email,
//     });

//     await todo.save();

//     // Schedule reminder with node-cron
//     if (todo.reminderDate) {
//       scheduleReminder(todo); // ✅ pass the saved todo
//     }

//     res.status(201).json({ message: "Todo created", todo });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error while creating todo" error,
//       error: error.message,
//     });
//   }
// };

// Create Todo



export const create = async (req, res) => {
  try {
    const { data, reminderDate, email } = req.body;

    if (!data || !email) {
      return res.status(400).json({ message: "Task and email are required" });
    }

    const todo = new Todo({
      data,
      reminderDate: reminderDate ? new Date(reminderDate) : null,
      email,
   
    });

    await todo.save();

    if (todo.reminderDate) {
      scheduleReminder(todo);
    }

    res.status(201).json({ message: "Todo created", todo });
  } catch (error) {
    console.error("❌ Error creating todo:", error); // 👈 log full error
    res.status(500).json({
      message: "Error while creating todo",
      error: error.message,
    });
  }
};


// Show All Todos
export const showAll = async (req, res) => {
  try {
    const todos = await Todo.find();

    if (todos.length === 0) {
      return res.status(200).json({ message: "No todos found", todos: [] });
    }

    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({
      message: "Error during fetching todos",
      error: error.message,
    });
  }
};

// Delete Todo
export const del = async (req, res) => {
  try {
    const { id } = req.params;

    const todoExist = await Todo.findById(id);
    if (!todoExist) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await Todo.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting todo",
      error: error.message,
    });
  }
};
