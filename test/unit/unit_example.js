'use strict'

describe('jasmine unit test example', () => {

  let testScope, controller, usersFactoryMock

  usersFactoryMock = {
    getUsers: () => {
      return {
        then: () => {}
      }
    }
  }

  beforeEach(() => {
    module('kemia-app', ($provide) => {
      $provide.service('usersFactory', usersFactoryMock)
    })

    inject(($rootScope, $controller) => {
      testScope = {}
      controller = $controller('HomeController', {
        $scope: testScope,
        usersFactory: usersFactoryMock
      })
    })
  })

  it('should run', () => {
    expect(controller.users).toBeDefined()
    expect(controller.users.length).toEqual(0)
  })
})
