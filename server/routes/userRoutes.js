const express = require('express');
const User = require('../Schema/User');
const router = express.Router();

router.post('/addtask', async (req, res) => {
    const { task, duedate, name } = req.body;
    console.log(req.body)
    try {
        const tasks = new User({ name, taskName: task, dueDate: duedate })
        const savedtask = await tasks.save()
        res.status(201).json({ status: 201, savedtask })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.get("/notes", async (req, res) => {
    try {
        const note = await User.find();
        res.status(201).json({ status: 201, note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.delete("/alltask/:id", async (req, res) => {
    try {
        const del = await User.findByIdAndDelete({ _id: req.params.id });
        res.json(del)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// edit our notes API 
router.put('/edittask/:id', async (req, res) => {
    const { taskName, dueDate, status } = req.body;
    try {
        const edittask = {};
        if (taskName.value) { edittask.taskName = taskName.value };
        if (dueDate.value) { edittask.dueDate = dueDate.value };
        if (status.value) { edittask.status = status.value };
        const UserData = await User.findOneAndUpdate({ _id: req.params.id },
            { $set: edittask }, { new: true })
        res.status(201).json({ status: 201, UserData })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.get("/SelectData", async (req, res) => {
    const keyword = req.query.taskName
        ?
        { "taskName": { $regex: req.query.taskName, $options: "i" } } //case insensitive

        : {};
    const users = await User.find(keyword);
    res.send(users);
});


module.exports = router