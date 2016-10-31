
'use strict'

describe('Protractor end to end tests for iotWithChem', () => {
  it('should have a title', () => {

    // global object from Protractor
    browser.get('https://iotwithchem.herokuapp.com')

    expect(browser.getTitle()).toEqual('')
  })
})
