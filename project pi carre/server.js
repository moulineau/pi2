
const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests
const cookieParser = require('cookie-parser');


// Controllers - aka, the db queries
const auth = require('./controllers/auth.js')
const main = require('./controllers/main.js')


// App
const app = express()
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.use('/auth', auth)
app.get('/allUsers', (req, res) => main.getTableData(req, res))
app.get('/users/:id', (req, res,next) => main.getUser(req, res, req.params.id,next))

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

// App Server Connection
app.listen(5000, () => console.log(`app is running on port ${5000}`))

