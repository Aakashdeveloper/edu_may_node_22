const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const app = express();
const port = 8770;

//static files
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

//middleware
app.use(bodyParser.json());
app.use(fileupload());

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/profile',(req,res) => {
    console.log(req.files);
    console.log(req.body);
    const imageFile = req.files.yourImage;
    // if(imageFile.mimetype == 'abc'){
    //     res.send('Not Allowed')
    // }
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data)=>{
        if(err) throw err;
        res.render('display',{title:req.body.uname, image:`${imageFile.name}`})
    })
})


app.listen(port)