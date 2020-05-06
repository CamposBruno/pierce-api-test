'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('groups', [{
      name: 'GroupName1',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'GroupName2',
      created_at: new Date(),
      updated_at: new Date()
    }], { })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {})
  }
}
