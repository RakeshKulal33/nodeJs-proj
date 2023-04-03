let express = require('express')

let app = express()

let cameraRouter = require('./routerFiles/camera')
let cameraNetRouter = require('./routerFiles/cameraNetworks')
app.use(express.json());

let mongoose = require('mongoose')
let env = require('dotenv').config()

console.log(process.env.MongoDB_USERNAME)

mongoose.connect('mongodb+srv://' + process.env.MongoDB_USERNAME + ':' + process.env.MongoDB_PASSWORD + '@cluster0.whvquvr.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(result => {
    console.log("Mongodb connected")
}).catch(err => {
    console.log(err)
})


app.use('/camera', cameraRouter)
app.use('/cameraNetwork', cameraNetRouter)


app.listen('3000', () => {
    console.log("Server is Connected")
})