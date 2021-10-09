const express = require('express');
const router = express.Router();

const Task = require('../db/models/task.model');

//Authorization
const isAuth = (req, res, next) => {
    if(req.session.isAuth)
    {
        next()
    }
    else{
        res.json({success: false, msg: 'No Authorization'});
    }
}

//add a task

router.post('/:id/tasks', isAuth, (req, res) => {
    let newTask = new Task(
    {
        title: req.body.title,
        _listId: req.params.id
    });

    Task.addTask(newTask, (err, task) => {
        if(err) throw err;

        if(task)
        {
            res.json({success: true, msg:'New Task Succesfully Added to list ' + req.params.id, task});
        }
        else
        {
            res.json({success: false, msg:'Failed to add Task to list ' + req.params.id});
        }
    });
});

//get All tasks in list

router.get('/:id/tasks', isAuth, (req, res) => {
    Task.getTasks(req.params.id, (err, tasks) => {
        if(err) throw err;

        if(tasks)
        {
            res.json({success: true, tasks});
        }
        else
        {
            res.json({success: false, msg: "Unable to Find Tasks inside List " + req.params.id});
        }
    });
})

//Update a task in a Specific List

router.patch('/:listId/tasks/:id', isAuth, (req, res) => {
    Task.updateTask(req.params.id, req.params.listId, req.body, (err, task) => {
        if(err) throw err;

        if(task)
        {
            res.json({success: true, task});
        }
        else
        {
            res.json({success: false, msg: 'Unable to Find List with the given ID in'});
        }
    });
})

// Remove a task

router.delete('/:listId/tasks/:id', isAuth, (req, res) => {
    Task.removeTask(req.params.id, req.params.listId, (err, task) =>
    {
        if(err) throw err;

        if(task)
        {
            res.json({success: true, task});
        }
        else
        {
            res.json({success: false, msg: 'Unable to find a task with the given ID'});
        }
    });
})

module.exports = router;

