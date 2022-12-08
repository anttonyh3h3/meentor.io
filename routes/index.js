const router = require('express').Router()
const Controller = require('../controllers');


router.get('/user/register', Controller.register)
router.post('/user/register', Controller.registerPost)
router.get('/user/register/instructor', Controller.registerInstructor)
router.post('/user/register/instructor', Controller.registerInstructorPost)
router.get('/user/login', Controller.userLogin)
router.post('/user/login', Controller.userLoginPost)

router.use(function(req, res, next) {
  console.log(req.session);
  // if (!req.session.userId) {
  //   const error = 'Please login to enter site!'
  //   res.redirect(`/user/login?error=${error}`)
  // } else {
  //   next()
  // }
  let loggedIn = false
  if (req.session.userId) {
    loggedIn = true
  }
  console.log('isLoggedIn = ' + loggedIn);
  next()
})

router.get('/user/logout', Controller.userLogout)

router.get('/', Controller.home)

module.exports = router;