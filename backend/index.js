import cors from 'cors';
import express from 'express';
require('dotenv').config();
import initRoutes from './routes';
require('./database/dbConnection');
const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET','POST','PUT','DELETE']
}))

//CRUD
app.use(express.json())
app.use(express.urlencoded({extend: true }));

initRoutes(app)

const PORT = process.env.PORT || 8888

const listener = app.listen(PORT,()=>{
  console.log('Server is running on the port ' + listener.address().port);
})