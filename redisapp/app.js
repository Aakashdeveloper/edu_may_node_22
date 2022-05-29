let express = require('express');
let axios = require('axios')
let redis = require('redis')
let port = process.env.PORT || 4200;
let app = express();

const client = redis.createClient({
    host: 'localhost',
    port:6379
})

app.get('/data',(req,res) => {
    let userInput = (req.query.country).trim();
    userInput = userInput?userInput:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    //Check data is in redis or not
    return client.get(`${userInput}`,(err,result) => {
        //if data is in redis
        if(result){
            const output = JSON.parse(result);
            res.send(output)
        }else{
            // as data is not in redis make an api call save in redis for next time
            axios.get(url)
                .then(response => {
                    //save the response in redis for next time
                    const output = response.data;
                    client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis Cache',output}))
                    res.send({source:'Api Response',output})
                })
        }
    })
})

app.listen(port, (err)=>{
    console.log(`Server is running on port ${port}`)
})