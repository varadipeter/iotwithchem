
'use strict'

describe('Protractor end to end tests for iotWithChem', () => {
  it('should have a title', () => {

    // global object from Protractor
    browser.get('https://kemia-app.herokuapp.com')

    expect(browser.getTitle()).toEqual('Kemia App')
  })
})
