const { User, Course, UserCourse } = require('../models')
const { formatDate } = require('../helpers')

class Controller {
    static home(req, res) {
        res.render('home')
    }

    static studentList(req, res){
        User.findAll({
            where: {
                roles: 'Student'
            },
            include: Course,
            order: [['fullName', 'ASC']]
        })
            .then(data => {
                res.render('studentList', { data, formatDate })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static studentDetails(req, res){
        const id = +req.params.id
        User.findByPk(id, {
            include: Course
        })
            .then(data => {
                res.render('studentDetails', { data, formatDate })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static studentEdit(req, res){
        const id = +req.params.id
        User.findByPk(id)
            .then(data => {
                res.render('studentEdit', { data })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static studentEditPost(req, res){
        const id = +req.params.id
        const { fullName, username, email } = req.body
        User.update({ fullName, username, email }, {where: {id}})
            .then(() => {
                res.redirect('/students')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editMentoringDate(req, res){
        const id = +req.params.id
        User.findByPk(id)
            .then(data => {
                res.render('mentoringDateEdit', { data })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postMentoringDate(req, res){
        const id = +req.params.id
        const { mentoringDate } = req.body
        User.update({ mentoringDate }, {where: {id}})
            .then(() => {
                res.redirect('/students')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static instructorList(req, res){
        User.findAll({
            where: {
                roles: 'Instructor'
            },
            include: Course
        })
            .then(data => {
                // res.render('instructorList', { data, formatDate })
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static courseDetail(req, res){
        Course.findAll({
            include: {
                model: User,
                as: "Instructor"
            }
        })
            .then(data => {
                // res.send(data)
                res.render('courseDetails', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

// UserCourse.create({
//     UserId: 12,
//     CourseId: 2
// })

// Course.create({
//     name: 'fisika',
//     description: 'asasdasdasdsa',
//     duration: 90,
//     UserId: 2
// })

module.exports = Controller