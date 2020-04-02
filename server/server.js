
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// PORT
const PORT = 3000

const api = require('./routes/api')
// instance of express
const app = express()
app.use(cors())
//body parser to handel json data
app.use(bodyParser.json())

app.use('/api',api)

// get request, call back function
app.get('/',function(req,res){
    res.send('hello from server')
})
// listning the response to port
app.listen(PORT,function(){
    console.log('Server Running on localhost:' + PORT)
})
