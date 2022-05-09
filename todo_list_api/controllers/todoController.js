const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Todo = require('../models/todoModel');

// create task 
exports.createTask = asyncHandler(async (req, res) => {
    const {task, active} = req.body
    const todo = await Todo.create({task, active});
    res.status(201).json({
        success: true,
        data: todo,
        message: 'Task is created successfully'
    })
})

// update task by id
exports.updateTask = asyncHandler(async (req, res) => {
    const {task, active} = req.body
    const existTask = await Todo.findOne({ _id : req.params.id})
    if(existTask){
        existTask.task = task;
        existTask.active = active
        const updatedTask = await existTask.save();
        res.status(200).json({
            success: true,
            data: updatedTask,
            message: 'Task is updated successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }
   
})

// delete task from todo
exports.deleteTask = asyncHandler(async (req, res) => {
    const existTask = await Todo.findOne({ _id : req.params.id})
    if(existTask){
        await existTask.remove();
        res.status(200).json({
            success: true,
            message: 'Task is deleted successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }
   
})

// get single task 
exports.getSingleTask = asyncHandler(async (req, res) => {
    const existTask = await Todo.findOne({ _id : req.params.id})
    if(existTask){
        res.status(200).json({
            success: true,
            data:existTask,
            message: 'Task is fetched successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }
   
})

//get all task
exports.getAllTasks = asyncHandler(async (req, res) => {
    const allTasks = await Todo.find({})
    if(allTasks){
        res.status(200).json({
            success: true,
            data:allTasks,
            message: 'All Tasks are fetched successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Tasks are Not Found'
        })
    }
   
})

