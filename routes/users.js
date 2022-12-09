const Controller = require('../controllers');

const router = require('express').Router()

router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)
router.get('/register/instructor', Controller.registerInstructor)
router.post('/register/instructor', Controller.registerInstructorPost)
router.get('/find-acc', Controller.userChangePassSearch)
router.get('/change-pass', Controller.userChangePass)
router.post('/change-pass', Controller.userChangePassPost)
router.get('/login', Controller.userLogin)
router.post('/login', Controller.userLoginPost)

module.exports = router;