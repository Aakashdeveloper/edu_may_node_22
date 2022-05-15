let fs = require('fs');

// overwrite the existing text
// fs.writeFile('myText.txt','Using Node Server',function(){
//     console.log('Task Done')
// })

// it add the text in the same file
/*
fs.appendFile('myCode.txt','Using JavaScript Server \n',function(){
    console.log('Task Done')
})
*/

///Read the text of file
// fs.readFile('myCode.txt','utf-8',(err,data) => {
//     if(err) throw err
//     console.log(data)
// })

// //////Rename file
// fs.rename('myCode.txt','myData.txt',(err) => {
//     if(err) throw err;
//     console.log('File Renamed')
// })

/////delete file
fs.unlink('myText.txt',(err) => {
    if(err) throw err;
    console.log('File Deleted')
})



