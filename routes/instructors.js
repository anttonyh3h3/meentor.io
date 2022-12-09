const Controller = require('../controllers');

const router = require('express').Router()

router.get('/', Controller.courseListForInstructor)
router.get('/add', Controller.addNewCourse)
router.post('/add', Controller.newCoursePost)
router.get('/:id/edit', Controller.instructorEditCourse)
router.post('/:id/edit', Controller.instructorEditCoursePost)
router.get('/:id/delete', Controller.instructorDeleteCourse)

module.exports = router;