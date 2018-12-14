var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var multer  = require('multer')
var OrientDB = require('orientjs')

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'root'
})
var db = server.use('o2')

var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
var app = express()
app.locals.pretty=true
app.set('views', './views_orientdb')
app.set('view engine', 'pug')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/user', express.static('uploads'))

// 사용자 정보 입력 받기
app.get('/topic/add', (req, res)=>{
    var sql = 'select from topic'
    db.query(sql).then((results)=>{
        res.render('add', {topics:results})
    })
})

app.get('/topic/:id/edit', (req, res)=>{
    var id = req.params.id
    if(id) {
        var sql = 'select from topic'
        db.query(sql).then((results)=>{
            var sql = 'select from topic where @rid=:rid'
            db.query(sql, {params:{rid:id}}).then((topic)=>{
                res.render('edit', {topics:results, topic:topic[0]})
            })
        })
    }
})

app.get('/topic/delete/:id', (req, res)=>{
    var id = req.params.id
    if(id) {
        var sql = 'select from topic where @rid=:rid'
        db.query(sql, {params:{rid:id}}).then((topic)=>{
            // var result = window.confirm(topic[0].title+'을\n삭제하시겠습니까?')
            // if(result){
                var sql = 'delete from topic where @rid=:rid'
                db.query(sql,{params:{rid:id}}).then((results)=>{
                    res.redirect('/topic')
                 })
            // }
        })
    }
})

app.get(['/topic', '/topic/:id'], (req, res)=>{
    var sql = 'select from topic'
    db.query(sql).then((results)=>{
        var id = req.params.id
        if(id) {
            var sql = 'select from topic where @rid=:rid'
            db.query(sql, {params:{rid:id}}).then((topic)=>{
                res.render('view', {topics:results, topic:topic[0]})
            })
        } else {
            res.render('view', {topics:results})
        }
    })
})

app.post('/topic/add', (req, res)=>{
    var title = req.body.title
    var description = req.body.description
    var author = req.body.author
    
    var sql = 'insert into topic (title, description, author) values(:title, :desc, :author)'
    db.query(sql, {params:{
        title:title, 
        desc:description, 
        author:author}
    }).then((results)=>{
        res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']))
    })
})

app.post('/topic/:id/add', (req, res)=>{
    var title = req.body.title
    var description = req.body.description
    var author = req.body.author
    var id = req.params.id

    var sql = 'update topic set title=:title, description=:desc, author=:author where @rid=:rid'
    db.query(sql, {params:{
        rid:id, 
        title:title, 
        desc:description,
        author:author}
    }).then((results)=>{
        res.redirect('/topic/'+encodeURIComponent(id))
    })
})

app.listen(3000, ()=>console.log('connected, 3000 port!!!'))