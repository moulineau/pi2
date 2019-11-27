
const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests


// Controllers - aka, the db queries
const auth = require('./controllers/auth.js')
const main = require('./controllers/main.js')


// App
const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.use('/auth', auth)
app.get('/allUsers', (req, res) => main.getTableData(req, res))
app.get('/users/:id', (req, res,next) => main.getUser(req, res, req.params.id,next))

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

// App Server Connection
app.listen(5000, () => console.log(`app is running on port ${5000}`))

