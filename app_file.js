var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var app = express()
app.locals.pretty=true
app.set('views', './views_file')
app.set('view engine', 'pug')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// 사용자 정보 입력 받기
app.get('/topic/new', (req, res)=>{
    res.render('new')
})

app.get('/topic/:topic', (req, res)=>{
    var topic = req.params.topic
    fs.readFile('data/'+topic, 'utf8', (err, data)=>{
        if(err){
            console.log(err)
            res.status(500).send('Internal server error')
        }
        fs.readdir('data', (err, files)=>{
            if(err){
                console.log(err)
                res.status(500).send('Internal server error')
            }
            res.render('view', {topics:files, title:topic, description:data})
        })
    })
})

app.get('/topic', (req, res)=>{

    fs.readdir('data', (err, files)=>{
        if(err){
            console.log(err)
            res.status(500).send('Internal server error')
        }
        res.render('view', {topics:files})
    })
    
})

// 전달받은 form data를 파일로 저장
app.post('/topic', (req, res)=>{
    var title = req.body.title
    var description = req.body.description

    fs.writeFile('data/'+title,description, (err)=>{
        if(err){
            console.log(err)
            res.status(500).send('Internal server error')
        }
        res.send('success!!!')
    })
})

app.listen(3000, ()=>console.log('connected, 3000 port!!!'))