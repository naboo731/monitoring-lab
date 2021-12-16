const express = require('express')
const path = require('path')
const app = express()
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'c82ddf2d8c4f46d99d3bab6013d0e2ae',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html loaded successfully')
})

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()
    students.push(name)
    
    rollbar.log('student added successfully', {author: 'Nicki', type: 'manual entry'})
    res.status(200).send(students)
})



app.use(rollbar.errorHandler)

const port = process.env.PORT || 4545

app.listen(port, () => {
    console.log(`Are you there dad? On Port ${port}?`)
})
