const express = require('express');
const app = express();
const port = process.env.PORT || 9700;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = "mongodb+srv://local:test12345@cluster0.f8vmc.mongodb.net";
let db;
let col_name = "dashboard";
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
let package = require('./package.json')

swaggerDocument.info.version = package.version;
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

///static file path
app.use(express.static(__dirname+'/public'));
//html file path
app.set('views','./src/views')
//view engine
app.set('view engine', 'ejs')

app.get('/health',(req,res)=>{
    res.status(200).send('Health Check ok')
})

app.get('/new',(req,res) => {
    res.render('forms')
})

app.get('/',(req,res)=>{
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err) throw err;
        res.render('index',{data:result})
    })
})


app.get('/users',(req,res) => {
    let query = {};
    if(req.query.role && req.query.city){
        query={role:req.query.role,city:req.query.city,isActive:true}
    }
    else if(req.query.role){
        query={role:req.query.role,isActive:true}
    }
    else if(req.query.city){
        query={city:req.query.city,isActive:true}
    }
    else if(req.query.isActive){
        let isActive = req.query.isActive;
        if(isActive == "false"){
            isActive = false
        }else{
            isActive = true
        }
        //query = {isActive:isActive}
        query = {isActive}
    }else{
        query = {isActive:true}
    }
    
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

//find particular user
app.get('/user/:id',(req,res) => {
    let id = mongo.ObjectId(req.params.id)
    db.collection(col_name).find({_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

// add user
app.post('/addUser',(req,res) => {
    const data = {
        "name":req.body.name,
        "city":req.body.city,
        "phone":req.body.phone,
        "role":'User',
        "isActive":true
    }
    db.collection(col_name).insert(data,(err,result) => {
        if(err) throw err;
        //res.status(200).send('Data Added')
        res.redirect('/')
    })
})

//update User
app.put('/updateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                date:new Date(),
                isActive:true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Updated')
        }
    )
})

//hard Delete
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).remove(
        {_id:mongo.ObjectId(req.body._id)},(err,result) => {
            if(err) throw err;
            res.send('User Deleted')
        }
    )
})

//soft Delete // deactivate
app.put('/deactivateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Deactivated')
        }
    )
})

//soft Delete // Activate
app.put('/activateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Activated')
        }
    )
})

MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(`Error While Connecting`)
    db = client.db('edumay');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
})