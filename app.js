var express = require("express")
var bodyParser = require('body-parser')
var app = express()
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))
app.locals.pretty=true 

app.get('/', (req, res)=>res.send('Hello World'))

app.get('/topic/:id', (req, res)=>{
    var topics = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ...'
    ]

    var output = `
        <a href="/topic/0">Javascript</a><br>
        <a href="/topic/1">Nodejs</a><br>
        <a href="/topic/2">Express</a><br><br>
        ${topics[req.params.id]}
    `

    res.send(output)
})

app.get('/form', (req, res)=>{
    res.render('form')
})

app.get('/form_receiver', (req, res)=>{
    res.send(req.query.title + ',' + req.query.description)
})

app.post('/form_receiver', (req, res)=>{
    res.send(req.body.title + ',' + req.body.description)
})

app.listen(3000, ()=>console.log('listening on port 3000'))

