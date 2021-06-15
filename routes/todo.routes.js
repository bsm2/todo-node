const express = require('express')
const router = new express.Router()
const taskController = require('../controller/todo.controller')

// router.get('',(req,res)=>{
//     res.send('home')

// })

router.get('/add', taskController.addTask)
router.get('', taskController.showAll)
router.get('/edit/:id', taskController.editTask)
router.get('/single/:id', taskController.showSingle)
router.get('/delete/:id', taskController.deleteTask)
module.exports = router