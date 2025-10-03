import e from "express";
import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
       data: { type: String, required: true },
       reminderDate: {type: Date, required: true},
       email: { type: String, required: true }
})

const Todo =  mongoose.model("todo",todoSchema)
export default Todo;