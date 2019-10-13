import { Router } from 'express'
import { check } from 'express-validator'
import controllers from './controllers'
import { needAuthorization } from '@/resources/middlewares'
import mongoose from 'mongoose'

const router = Router()

router.post('/:tagId', [
  check('tagId').custom(value =>
    mongoose.Types.ObjectId.isValid(value))
], needAuthorization, controllers.CreateSubscription)

router.delete('/:subscriptionId', [
  check('subscriptionId').custom(value =>
    mongoose.Types.ObjectId.isValid(value))
], needAuthorization, controllers.CancelSubscription)

export default router