import { Router } from 'express'
import { check } from 'express-validator'
import { needAuthorization } from '@/resources/middlewares'
import controllers from './controllers'

const router = Router()

router.get('/', needAuthorization, controllers.GetAllTags)

router.post('/', [
  check('name').isString().not().isEmpty(),
  check('description').isString().not().isEmpty(),
  check('joinOption').isIn(['P', 'R', 'O'])
], needAuthorization, controllers.CreateTag)

router.delete('/:tagId', needAuthorization, controllers.DeleteTag)

router.put('/:tagId', (req, res, next) => {})

router.get('/:tagId/subscribers', (req, res, next) => {})

export default router
