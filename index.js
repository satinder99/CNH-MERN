const express= require('express')
const app = express()

app.listen(3000, ()=>{
    console.log(`Application is listening on port 3000`);
})

app.get('/',(req,res)=>{
    console.log("hello world");
    res.send("hello world")
})

