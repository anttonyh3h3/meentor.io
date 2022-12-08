const bcrypt = require('bcryptjs')
const { User, Course, UserCourse } = require("../models");
const { formatDate } = require('../helpers')

class Controller {
  static home(req, res) {
    const { userRole } = req.session

    res.render("home", { userRole });
  }

  static register(req, res) {
    const { errors } = req.query

    res.render("user-register-form", { errors });
  }

  static registerPost(req, res) {
    const { fullName, email, username, password, roles } = req.body;

    User.create({ fullName, email, username, password, roles })
      .then(() => res.redirect('/user/find-acc'))
      // .catch(err => res.send(err.errors.map(e => e.message)))
      .catch(err => {
        const errors = err.errors.map(e => e.message)

        res.redirect(`/user/register?errors=${errors}`)
      })
      // .catch(err => res.render('user-register-form', { error: err.errors.map(e => e.message) }))
  }

  static registerInstructor(req, res) {
    res.render("instructor-register-form");
  }

  static registerInstructorPost(req, res) {
    const { fullName, email, username, password, roles } = req.body;

    User.create({ fullName, email, username, password, roles })
      .then(() => res.redirect('/user/find-acc'))
      .catch(err => res.send(err))
  }

  static userLogin(req, res) {
    const { error } = req.query

    res.render('login', { error })
  }

  static userChangePassSearch(err, res) {
    res.render('find-acc')
  }

  static userChangePass(req, res) {
    const { username } = req.query

    User.findOne({ where: { username } })
      .then(data => {
        res.render('change-pass-form', { data })
      })
      .catch(err => res.send(err))
    
  }
  
  static userChangePassPost(req, res) {
    const { username, password } = req.body

    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt)
    const hashedPass = hash

    User.update({ password: hashedPass }, { where: { username } })
      .then(() => res.redirect('/user/login'))
      .catch(err => res.send(err))
  }

  static userLoginPost(req, res) {
    const { username, password } = req.body

    User.findOne({ where: { username }})
      .then(user => {
        
        if (user) {
          const isValidPass = bcrypt.compareSync(password, user.password)

          if (isValidPass) {

            req.session.userId = user.id
            req.session.userRole = user.roles

            return res.redirect('/')
          } else {
            const error = 'username or password invalid'
            return res.redirect(`/user/login?error=${error}`)
          }
        } else {
          const error = 'username or password invalid'
          return res.redirect(`/user/login?error=${error}`)
        }
      })
      .catch(err => {
        res.send('ini err')
      })
  }

  static userLogout(req, res) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      else res.redirect('/')
    })
  }
  
  static courseListForStudent(req, res){
        Course.findAll({
            include: {
                model: User,
                as: "Instructor"
            }
        })
            .then(data => {
                res.render('courseListForStudent', { data })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static studentBuyCourse(req, res){
        const id = +req.params.id
        Course.findByPk(id, {
            include: {
                model: User,
                as: "Instructor"
            }
        })
            .then(data => {
              // res.send(data)
                res.render('studentBuyCourse', { data, formatDate })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static buyCoursePost(req, res){
      const { userId } = req.session
        const courseId = +req.params.id
        UserCourse.create({ UserId: userId, CourseId: courseId})
            .then(data => {
                res.redirect('/courses')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller;
