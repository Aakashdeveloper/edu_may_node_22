let express = require('express');
let app = express();
let fs = require('fs');
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 3500;
let morgan = require('morgan');
let menu = [
    {link:'/',name:'Home'},
    {link:'/category',name:'Category'},
    {link:'/products',name:'Products'}
]

let categoryRouter = require('./src/routes/categoryRoutes')(menu);
let productRouter = require('./src/routes/productRoutes')(menu);

///static file path
app.use(express.static(__dirname+'/public'));
//html file path
app.set('views','./src/views')
//view engine
app.set('view engine', 'ejs')


// using middleware
app.use(morgan('common',{stream: fs.createWriteStream('./app.log')}));

app.get('/',(req,res) => {
    //res.send('Hii To Node Express');
    res.render('first',{title:'Home Page',menu})
})

app.use('/category',categoryRouter)
app.use('/products',productRouter)

// creating express server
app.listen(port, (err) =>{
    if(err) throw err;
    else{
        console.log(`Server running on port ${port}`)
    }
})