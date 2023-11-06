const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const UserRoute =  require('./routes/userRoute');
const NoteRoute =  require('./routes/noteRoute');
const AdminRoute =  require('./routes/authRoute');

const db = mongoose.connect(process.env.MONGO_URL, {})
.then(()=>console.log('db connection successfull'))
.catch((err)=>console.log(err));

app.use(express.json());

app.use('/api/user', UserRoute);
app.use('/api/notes', NoteRoute);
app.use('/api/auth', AdminRoute);


app.listen(process.env.ROUTE, ()=>{
    console.log('server is running');
})
