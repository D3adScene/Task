var sqlite3 = require('sqlite3').verbose()

class DataBase {
  constructor () {
    this.isConnected = false
    this.db = null
    if (this.isConnected) return this.db
    else {
      this.db = new sqlite3.Database('./sqlite.db', (err) => {
        if (err) {
          console.error(err.message)
        } else {
          this.select()
          console.log('Connected to the chinook database.')
        }
      })
    }
  }
  select (querry) {
    let db = this.db
    db.serialize(function () {
      //TODO ADD select
    })
  }
}

module.exports = DataBase
