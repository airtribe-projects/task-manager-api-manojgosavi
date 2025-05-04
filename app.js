const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

const logger = (req, res, next) => {console.log(`${req.method} : Request received on ${req.url}`); next();}

app.get('/', [logger], (req, res) => {
    res.send("Hello World!");
})

const tasks = require('./task.json');

app.get('/tasks', (req, res) => {
    let filteredTasks = tasks;
    let sortedTasks = tasks;
    if (req.query.sortBy === 'title'){
        sortedTasks = tasks.sort((a, b) => a.title.localeCompare(b.title));
        }
    res.json(sortedTasks);
    if (typeof req.query.completed !== 'undefined'){
        const isCompleted = req.query.completed === 'true';

        filteredTasks = tasks.filter(task => task.completed === isCompleted);
    }
    console.log(req.query);
    res.send(tasks);
    res.json(filteredTasks); 
});

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    }else{
        res.status(404).json({error:"Task not found"});
    }
});

app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;

    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and should be a non-empty string.' });
    }
    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description is required and should be a non-empty string.' });
    }
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed status must be a boolean.' });
    }

    const newTaskId = tasks.length + 1;

    const newTask = {
        id: newTaskId,
        title,
        description,
        completed
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);

    const task = tasks.find(t => t.id === taskId);

    if(!task){
        return res.status(404).json({error: 'Task not found'});
    }

    const {title, description,completed} = req.body;

    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and should be a non-empty string.' });
    }
    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description is required and should be a non-empty string.' });
    }
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed status must be a boolean.' });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;

    res.json(task);

});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);

    res.status(200).json({ message: 'Task successfully deleted' });
});
module.exports = app;