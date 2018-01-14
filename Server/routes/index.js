var express = require('express')
var router = express.Router()
var DataBase = require('../DB/DataBase')

var db = new DataBase()
router.post('/login', function (req, res) {
  res.send('hello world')
})

module.exports = router
