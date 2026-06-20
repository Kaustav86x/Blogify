// importing depedencies
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const contactRoutes = require('./routes/contactRoutes')
const commentRoutes = require('./routes/commentRoutes')

// express app creation
const app = express()

// middlewares
app.use(express.json())

app.options("*", cors()); //handle preflight requests
// cors
const allowedOrigins = [
    'https://blogify-frontend.vercel.app',
    'http://localhost:5173',
    "https://www.kaustavdey.com",
    "https://kaustavdey.com",        // without www as well
    "http://localhost:5173",          // keep for local dev
    "http://localhost:8080",
];

app.use(cors({
    origin:function(origin,callback){
        if(allowedOrigins.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true,
}))

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})


app.use('/api', contactRoutes);
app.use('/api', commentRoutes);

// database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Connected to DB and listening on PORT',process.env.PORT)
    })
})
.catch(err => {
    console.log(err.message)
})

