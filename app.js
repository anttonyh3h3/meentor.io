const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', Controller.home)
app.get('/students', Controller.studentList)
app.get('/students/:id/detail', Controller.studentDetails)
app.get('/students/:id/edit', Controller.studentEdit)
app.post('/students/:id/edit', Controller.studentEditPost)

app.get('/students/:id/addNewCourse/:courseId', Controller.studentAddNewCourse)
app.post('/students/:id/addNewCourse/:courseId', Controller.studentPostNewCourse)

app.get('/students/mentoringdate/:id/edit', Controller.editMentoringDate)
app.post('/students/mentoringdate/:id/edit', Controller.postMentoringDate)

app.get('/instructors', Controller.instructorList)

app.get('/courses', Controller.courseListForStudent)
app.get('/courses/:id/buyCourse', Controller.studentBuyCourse)
app.post('/course/:id/buyCourse')


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})