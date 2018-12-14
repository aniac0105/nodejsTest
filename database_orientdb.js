var OrientDB = require('orientjs')

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'root'
})

var db = server.use('o2')

function select() {
    var sql = 'select from topic'

    db.query(sql).then((results)=>{
        console.log(results)
    })
}

function query(sql, params) {
    db.query(sql, params).then((results)=>{

    })
}
/*
db.record.get('#21:0').then((record)=>{
    console.log('record : ', record)
})
*/

/*
var sql = 'select from topic'
db.query(sql).then((results)=>{
    console.log(results)
})
*/

/*
var sql = 'select from topic where @rid=:id'
var param = {
    params:{
        id:'#21:0'
    }
}
db.query(sql, param).then((results)=>{
    console.log(results)
})
*/

/*
var sql = 'insert into topic (title, description) values(:title, :desc)'
db.query(sql, {
    params:{
        title: 'Express',
        desc: 'Express is ...'
    }
}).then((results)=>{
    console.log(results)
})
*/

/*
var sql = 'update topic set title=:title where @rid=:rid'
db.query(sql, {
    params:{
        title: 'new Java',
        rid: '#22:0'
    }
}).then((results)=>{
    console.log(results)
})
*/

/*
var sql = 'delete VERTEX topic where @rid=:rid'
db.query(sql, {
    params:{
        rid: '#22:0'
    }
}).then((results)=>{
    console.log(results)
})
*/