'use strict'



let path = require('path')
// load the Db module 
//var Db = require(path.resolve('../../backend/models/db'))
//let Temp = require(path.resolve('../../backend/models/temperature'))
let Db = require('../../backend/models/db')
let Temp = require('../../backend/models/temperature')
let dbget = require('../../backend/models/downloadData')



describe(' Database  test fixtures ', () => {

	var db, serialnumber, sensorid, value, actualTime
	var resValue, resActualTime, result
	var dbFunction
	var dbFunctionfindOne

	beforeEach((done) => {
		// create db connection 
		db = new Db()
		serialnumber = '000000004064b4d2'
		sensorid = '1'
		value = '30.00'
		actualTime = new Date().getTime()

		dbFunction = {
			dbSave: function () {
				db.createTemperatureMessage(serialnumber, sensorid, value, actualTime, function (err) {
					if (err) console.log(err)
					console.log('Db saved ...')
					done()
				}) // end createTemperatureMessage
			} // end of db save 
		} // end of dbFunction

		// call the  function 
		dbFunction.dbSave()


	})  // end BeforeEach  fisrt 


	describe(' Database   find One  fixtures ', () => {
		

		beforeEach((done) => {
			// create db connection 

			dbFunctionfindOne = {
				dbFindOne: function () {
					//let tempDocument  = new Temp({'raspberryid': serialnumber, 'sensorid': sensorid, 'tempvalue':value,'tempdate':actualTime})
					
					console.log('Before Asynch call to  DB sensorid:' , sensorid)
					dbget.getTemperature(sensorid, function (returndata) {
						console.log('Received from DB:',  returndata)
						resValue = returndata.tempvalue
						resActualTime = returndata.tempdate
						done() 
					})
/* 
					//let tempDocument = new Temp({ 'raspberryid': '1', 'sensorid': sensorid, 'tempvalue': value, 'tempdate': actualTime })
					Temp.findOne(tempDocument, function (err, result) {
						if (err)
							console.error(err)
						resValue = result.tempvalue
						resActualTime = result.tempdate
						console.log('Received Value ', resValue)
						done()
					}) // findOne end 
*/ 	
				} // end dbFindOne
			} // end of dbFunctionfindOne

			// call the  function 
			dbFunctionfindOne.dbFindOne()
		})  // end BeforeEach  second  


		it('save  check for Temperature mock  - True ', (done) => {
			expect(resValue).toEqual(value)
			expect(resActualTime).toEqual(actualTime)
			console.log('findOne was called and the value is : ', result)
			done() // to be shure that is called 

		}) // end of it spec 
	}) // end of nested describe 

}) // end of describe 