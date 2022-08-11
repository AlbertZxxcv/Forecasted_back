const express = require('express')
const router = express.Router()

const handler = require('../router_handler/user')
// register
router.post('/reguser', handler.regUser)

// log in
router.post('/login', handler.login)

// get the comment
router.get('/comment', handler.getComment)

// add the comment into database
router.post('/add', handler.addComment)

module.exports = router

