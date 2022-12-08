const router = require('express').Router()
const Controller = require('../controllers');


router.get('/user/register', Controller.register)
router.post('/user/register', Controller.registerPost)
router.get('/user/register/instructor', Controller.registerInstructor)
router.post('/user/register/instructor', Controller.registerInstructorPost)
router.get('/user/find-acc', Controller.userChangePassSearch)
router.get('/user/change-pass', Controller.userChangePass)
router.post('/user/change-pass', Controller.userChangePassPost)
router.get('/user/login', Controller.userLogin)
router.post('/user/login', Controller.userLoginPost)

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

// router.get('/students', Controller.studentList)
// router.get('/students/:id/detail', Controller.studentDetails)
// router.get('/students/:id/edit', Controller.studentEdit)
// router.post('/students/:id/edit', Controller.studentEditPost)

// router.get('/students/:id/addNewCourse/:courseId', Controller.studentAddNewCourse)
// router.post('/students/:id/addNewCourse/:courseId', Controller.studentPostNewCourse)

// router.get('/students/mentoringdate/:id/edit', Controller.editMentoringDate)
// router.post('/students/mentoringdate/:id/edit', Controller.postMentoringDate)

// router.get('/instructors', Controller.instructorList)

router.get('/courses', Controller.courseListForStudent)
router.get('/courses/:id/buyCourse', Controller.studentBuyCourse)
router.post('/courses/:id/buyCourse', Controller.buyCoursePost)

module.exports = router;