let express = require('express');
let categoryRouter = express.Router()
let mongodb = require('mongodb').MongoClient;
let mongoUrl = process.env.MongoUrl


function router(menu){
    categoryRouter.route('/')
        .get((req,res) => {
            mongodb.connect(mongoUrl,(err,dc) => {
                if(err){
                    res.status(500).send('Error While Connecting')
                }else{
                    let dbObj = dc.db('edumay')
                    dbObj.collection('category').find().toArray((err,response) => {
                        res.render('category',{title:'Category Page',data:response,menu})
                    })
                }
            })
        //res.send(category);
    })

    categoryRouter.route('/details')
        .get((req,res) => {
        res.send('Category Details');
    })

    return categoryRouter
}


module.exports = router