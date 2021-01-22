const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const userController = require('./controllers/UserController.js')
const db = require('./models')
const app = express()

app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Running healthy....')
})

app.use('/user', userController)

db.sequelize.sync()

app.listen(8080, () => {
    console.log('server started')
})