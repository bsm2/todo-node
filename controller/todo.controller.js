taskHelper = require('../helpers/myFunction.helper')

const addTask = (req, res)=>{
    let data = {
        pageTitle: 'add Task',
        errors :[],
        errorStatus:false,
        editStatus:false
    }
    if(Object.keys(req.query).length != 0){
        if(req.query.name == '') data.errors.push('invalid name')
        if(req.query.content == '') data.errors.push('invalid content')
        if(data.errors.length == 0) {
            newData = req.query
            newData.status == 'on'?newData.status=true : newData.status=false;
            newData.id = Date.now()
            result = taskHelper.addData(newData)
            if(!result.status) {
                data.errors.push("cann't add to json file")
            }
        }
        if(data.errors.length ==0)  res.redirect('/')
        data.errorStatus=true

    }
    res.render('add', data) 
}
const showAll = (req, res)=>{
    let allTasks = taskHelper.readData()
    data = {
        pageTitle: 'all Tasks',
        tasks: allTasks,
        tasksLen: (allTasks.length==0?true:false)
    }
    res.render('all', data)
}

const showSingle = (req, res)=>{
    let data = {
        pageTitle: 'single Task',
        status: false
    }
    const id = req.params.id
    const allTasks = taskHelper.readData()
    let record = allTasks.find(task=> task.id == id )
    if(!record) data.status=true
    else data.myData=record
    res.render('single', data)
}

const deleteTask = (req, res)=>{
    const id = req.params.id
    const allTasks = taskHelper.readData()
    let record = allTasks.findIndex(task=> task.id == id )
    if(record!=-1) {
        allTasks.splice(record,1)
        taskHelper.writeData(allTasks)
    }

    res.redirect('/')
}

const editTask = (req, res)=>{

    const id = req.params.id
    console.log(id)
    const allTasks = taskHelper.readData()
    let record = allTasks.find(task=> task.id == id )
    let data = {
        pageTitle: 'edit Task',
        errors :[],
        status:false,
        tasks:record,
        editStatus:true
    }
    console.log(data)
    if(!record){ 
        data.status=true
        // res.redirect('/')
    }else {
        if(Object.keys(req.query).length != 0){
            if(req.query.name == '') data.errors.push('invalid name')
            if(req.query.content == '') data.errors.push('invalid content')
            if(data.errors.length == 0) {
                record.name = req.query.name
                record.content = req.query.content
                record.status = req.query.status
                req.query.status == 'on'?record.status=true : record.status=false;
                taskHelper.writeData(allTasks)
                res.redirect('/')
            }else{
                data.errorStatus=true
            }
        }
        
    }
    
    res.render('add', data)
}

module.exports ={addTask,editTask,showAll,showSingle,deleteTask}