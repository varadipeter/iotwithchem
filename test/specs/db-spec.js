'use strict'



let path = require('path')
// load the Db module 

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
				setTimeout(function () {
					db.createTemperatureMessage(serialnumber, sensorid, value, actualTime, function (err) {
						if (err) console.log(err)
						//console.log('Db saved ...')
						done()
					}, 0);
				}) // end createTemperatureMessage
			} // end of db save 
		} // end of dbFunction

		// call the  function 
		dbFunction.dbSave()


	})  // end BeforeEach  fisrt 




	describe(' :: Save actual value to db '  , () => {


		beforeEach((done) => {
			// create db connection 

			dbFunctionfindOne = {
				dbFindOne: function () {
					//let tempDocument  = new Temp({'raspberryid': serialnumber, 'sensorid': sensorid, 'tempvalue':value,'tempdate':actualTime})
					//console.log('Before Asynch call to  DB sensorid:', sensorid)

					setTimeout(function () {
						dbget.getTemperature(sensorid, function (returndata) {
							//console.log('Received from DB:', returndata)
							resValue = returndata.tempvalue
							//resActualTime = returndata.tempdate
							done()
						}, 0);

					})

				} // end dbFindOne
			} // end of dbFunctionfindOne

			// call the  function
			dbFunctionfindOne.dbFindOne()
		})  // end BeforeEach  second  


		afterEach((done) => {
			db.close()
			done()
		})

		it(':: check if  pre saved value aure realy in db :: expected - True ', (done) => {
			expect(resValue).toEqual(value)
			done() // to be shure that is called 

		}) // end of it spec 
	}) // end of nested describe 

}) // end of describe 