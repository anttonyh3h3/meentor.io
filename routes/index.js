const router = require('express').Router()
const Controller = require('../controllers');


router.use('/user', require('./users'))

router.use(function(req, res, next) {
  console.log(req.session);
  let loggedIn = false
  if (req.session.userId) {
    loggedIn = true
  }
  console.log('isLoggedIn = ' + loggedIn);
  next()
})

router.get('/user/logout', Controller.userLogout)

router.get('/', Controller.home)

router.use('/courses', require('./courses'))

router.use('/instructors', require('./instructors'))

router.get('/book-mentor/:userId', Controller.mentorBook)
router.post('/book-mentor/:userId', Controller.mentorBookPost)

// router.get('/students', Controller.studentList)
// router.get('/students/:id/detail', Controller.studentDetails)
// router.get('/students/:id/edit', Controller.studentEdit)
// router.post('/students/:id/edit', Controller.studentEditPost)
// router.get('/students/mentoringdate/:id/edit', Controller.editMentoringDate)
// router.post('/students/mentoringdate/:id/edit', Controller.postMentoringDate)

module.exports = router;