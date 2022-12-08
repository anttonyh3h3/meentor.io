const bcrypt = require('bcryptjs')
const { User } = require("../models");

class Controller {
  static home(req, res) {
    const { userRole } = req.session

    res.render("home", { userRole });
  }

  static register(req, res) {
    res.render("user-register-form");
  }

  static registerPost(req, res) {
    const { fullName, email, username, password, roles } = req.body;

    User.create({ fullName, email, username, password, roles })
      .then(() => res.redirect('/'))
      .catch(err => res.send(err))
  }

  static registerInstructor(req, res) {
    res.render("instructor-register-form");
  }

  static registerInstructorPost(req, res) {
    const { fullName, email, username, password, roles } = req.body;

    User.create({ fullName, email, username, password, roles })
      .then(() => res.redirect('/'))
      .catch(err => res.send(err))
  }

  static userLogin(req, res) {
    const { error } = req.query

    res.render('login', { error })
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
}

module.exports = Controller;
