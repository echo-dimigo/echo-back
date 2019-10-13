import express from 'express'

import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { attachUserInfo } from '@/resources/middlewares'

import routes from '@/routes'

import swaggerGen from 'express-swagger-generator'
import swaggerOpt from '../swagger.json'

dotenv.config('.env')

const app = express()
const swagger = swaggerGen(app)
swagger({
  ...swaggerOpt,
  basedir: __dirname
})

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.set('jwtSecret', process.env.JWT_SECRET)

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(attachUserInfo)

app.use('/auth', routes.Auth)
app.use('/post', routes.Post)
app.use('/comment', routes.Comment)
app.use('/tag', routes.Tag)
app.use('/subscription', routes.Subscription)

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    res.status(error.code)
      .json({
        properties: error.properties
      })
  } else if (error.name === 'EchoError') {
    res.status(error.code)
      .json({
        message: error.message
      })
  } else {
    res.status(500)
      .json({
        message: error.message
      })
  }
})

export default app
