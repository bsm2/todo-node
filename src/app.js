
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const myRoutes = require('../routes/todo.routes')


app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../resourses/views'))
hbs.registerPartials(path.join(__dirname,'../resourses/layouts'))

app.use(myRoutes)

module.exports = app
