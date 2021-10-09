const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId: 
    {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }

})

const Task = module.exports = mongoose.model('Task', TaskSchema);


//Get All Tasks
module.exports.getTasks = (_listId, callback) => {
    Task.find({_listId: _listId},callback);
}

//Get Task By ID
module.exports.getTaskById = (_listId, _id, callback) => {
    Task.findOne({_id: _id, _listId: _listId}, callback);
}

//Add a Task

module.exports.addTask = (newTask, callback) => {
    newTask.save(callback);
}

//update a task by ID
module.exports.updateTask = (_id, _listId, body, callback) =>
{
    Task.findOneAndUpdate({_id: _id, _listId: _listId}, {$set: body}, callback);
}

//remove a Task by ID
module.exports.removeTask = (_id, _listId, callback) =>
{
    Task.findOneAndRemove({_id: _id, _listId: _listId}, callback);
}

