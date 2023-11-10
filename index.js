const express = require('express')//this allows to install the latest package of express 
const app = express() // need to make it an app

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/voters', require('./Routes/api/voters'))

app.listen(3000, () => {
    console.log('server is running ') // the application is running on the server localhost 3000
})