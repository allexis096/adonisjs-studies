'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

class UserController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    const user = await User.create(data)

    await user.addresses().createMany(addresses)

    return user
  }
}

module.exports = UserController
