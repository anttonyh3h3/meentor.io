const Controller = require('../controllers');

const router = require('express').Router()

router.get('/', Controller.courseListForStudent)
router.get('/:id/buyCourse', Controller.studentBuyCourse)
router.post('/:id/buyCourse', Controller.buyCoursePost)

module.exports = router;