
const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware

const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests
const cookieParser = require('cookie-parser')

// Controllers 
const auth = require('./controllers/auth.js')
const user = require('./controllers/user.js')
const authMiddleware = require('./controllers/middleware');

// App
const app = express()
app.use(cookieParser('test'));
app.use(helmet())
app.use(cors({
    origin: "http://localhost:3000/",
    credentials:true
}))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes 
app.use('/auth', auth)
app.use('/use', authMiddleware.ensureLoggedIn, user)





// error handler
app.use(function (err, req, res, next) {
    res.status(err.status ||  500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

// App Server Connection
app.listen(5000, () => console.log(`app is running on port ${5000}`))

