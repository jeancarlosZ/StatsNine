const router = require('express').Router()
module.exports = router

//* Use our datamanager
router.use('/data', require('./dataManager'))
// router.use('/users', require('./users'))

//* If api route is not found
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
