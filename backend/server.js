import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import connectDB from './config/db.js'
import handleError from './middleware/handleError.js'
import fileUpload  from './routes/fileUpload.js'

const app = express()
dotenv.config({path: 'config.env'})
connectDB()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.resolve('uploads')))
console.log(path.resolve('uploads'))

app.get('/', (req, res, next)=>{
    res.send('hi !')
})
app.use('/api', fileUpload)
app.use(handleError)


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`the server is run in Port ${PORT}`)
})