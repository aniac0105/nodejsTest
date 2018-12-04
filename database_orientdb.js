var OrientDB = require('orientjs')

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'root'
})

var db = server.use('o2')

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

var sql = 'insert into topic (title, description) values(:title, :desc)'
var param = {
    params:{
        title: '',
        desc: ''
    }
}
db.query(sql).then((results)=>{

})