'use strict'

let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let aliveSchema = new Schema({
  alivedate : String
})

module.exports = mongoose.model('Alive', aliveSchema)
