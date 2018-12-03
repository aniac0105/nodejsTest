var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var multer  = require('multer')
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
app.set('views', './views_file')
app.set('view engine', 'pug')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/user', express.static('uploads'))

// 사용자 정보 입력 받기
app.get('/topic/new', (req, res)=>{
    fs.readdir('data', (err, files)=>{
        if(err){
            console.log(err)
            res.status(500).send('Internal server error')
        }
        res.render('new', {topics:files})
    })
})

// 리스트 보여 주고 사용자가 원하는 페이지로 이동 처리
app.get(['/topic', '/topic/:id'], (req, res)=>{
    fs.readdir('data', (err, files)=>{
        if(err){
            console.log(err)
            res.status(500).send('Internal server error')
        }
        var result = {topics:files}
        var id = req.params.id  
        if(id) {
            fs.readFile('data/'+id, 'utf8', (err, data)=>{
                if(err){
                    console.log(err)
                    res.status(500).send('Internal server error')
                }
                result['title'] = id
                result['description'] = data
                res.render('view', result)
            })
        } else {
            result['title'] = 'Hello~'
            result['description'] = 'welcome ~'
            res.render('view', result)
        }
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
        res.redirect('/topic/'+title)
    })
})

app.get('/upload', (req, res)=>{
    res.render('upload')
})

app.post('/upload', upload.single('userfile'), (req, res)=>{
    var file = req.file
    res.redirect('/user/'+req.file.originalname)
})

app.listen(3000, ()=>console.log('connected, 3000 port!!!'))