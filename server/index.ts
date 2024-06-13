import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { build_router } from './routes/build.route'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
dotenv.config()

// routes
app.use('/api/builds/', build_router)

mongoose
  .connect(process.env.DATABASE_URL ?? '')
  .then(() => {
    console.log('Connected to database!')
    app.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  })
  .catch((error) => {
    console.log(error)
  })
