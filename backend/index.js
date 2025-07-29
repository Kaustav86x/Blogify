// importing depedencies
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

//custom imports
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const contactRoutes = require('./routes/contactRoutes')

// express app creation
const app = express()

// cors
const allowedOrigins = [
    'http://localhost:5173', process.env.CLIENT_URL
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

// middlewares
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

// routes
// app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);

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

