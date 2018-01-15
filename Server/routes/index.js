const express = require('express')
const router = express.Router()
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const status = require('../helpers/status')
const dbPath = path.join(__dirname, '../DB/sqlite.db')
const watchDir = path.join(__dirname, '../watch')

let logs = []

/**
 * Connect to sqlite3 DB.
 * In case of error print it on the console.
 */
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the database.')
})

/**
 * @function start - POST - start watching on the 'watch' folder.
 *                          prints to the logs the changing.
 * 
 * @returns status - Object.
 */
router.post('/start', (req, res) => {
  try {
    fs.watch(watchDir, (eventType, filename) => {
      if (filename) {
        logs.push(`event type is: ${eventType} file name is: ${filename}`)
      }
    })
    res.send(status.successRes)
  } catch(e) {
    res.send(status.failedRes)
  }
})

/**
 * @function status - GET - start watching on the 'watch' folder.
 *                          prints to the logs the changing.
 * 
 * @returns status - Object - with the current logs.
 */

router.get('/status', (req, res) => {
  let response = status.successRes
  console.log(logs)
  response.data = logs
  res.send(response)
})

router.get('/stop', (req, res) => {
  logs = []
  console.log(logs)
  res.send(status.successRes)
  try {
    fs.close()
  } catch(e) {
    res.send(response.failedRes)
  }
})

router.post('/login', (req, res) => {
  if (!req.body) {
    res.send(badData)
  } else {
    let params = req.body
    let username = params.userName
    let password = params.password
    let q = `select * from Users where username='${username}'`

    try {
      db.get(q, (err, row) => {
        if (err) {
          console.error(err)
          res.send(status.failedRes)
        } else if (row) {
          let isPasswordOk = row.password == password

          if (isPasswordOk) {
            res.send(status.successRes)
          } else {
            res.send(status.badPassword)
          }
        } else {
          res.send(status.badUsername)
        }
      })
    } catch (e) {
      console.error(e)
      res.send(status.failedRes)
    }
  }
})

module.exports = router
