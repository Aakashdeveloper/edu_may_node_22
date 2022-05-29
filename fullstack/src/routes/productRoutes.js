let express = require('express');
let productRouter = express.Router()
let mongodb = require('mongodb').MongoClient;
let mongoUrl = process.env.MongoUrl

function router(menu){
    productRouter.route('/')
    .get((req,res) => {
        //res.send(products);
        // products:products  == products
        mongodb.connect(mongoUrl,(err,dc) => {
            if(err){
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('edumay')
                dbObj.collection('products').find().toArray((err,products) => {
                    res.render('product',{title:'Products Page',products,menu})
                })
            }
        })
    })

    productRouter.route('/category/:id')
    .get((req,res) => {
        //let id = req.params.id
        let {id} = req.params
        mongodb.connect(mongoUrl,(err,dc) => {
            if(err){
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('edumay')
                dbObj.collection('products').find({category_id:Number(id)}).toArray((err,products) => {
                    res.render('product',{title:'Products Page',products,menu})
                })
            }
        })
        
    })

    productRouter.route('/details/:id')
    .get((req,res) => {
        let {id} = req.params
        mongodb.connect(mongoUrl,(err,dc) => {
            if(err){
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('edumay')
                dbObj.collection('products').find({id:Number(id)}).toArray((err,products) => {
                    res.render('productDetails',{title:'Products Details Page',products,menu})
                })
            }
        })
    })

    return productRouter
}


module.exports = router