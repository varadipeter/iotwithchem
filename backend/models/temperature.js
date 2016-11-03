'use strict'

let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let temperatureSchema = new Schema({
  tempvalue : String,
  tempdate : String
})

module.exports = mongoose.model('Temperatures', temperatureSchema)
