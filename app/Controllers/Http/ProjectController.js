'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Project = use('App/Models/Project')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
class ProjectController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { page } = request.get()

    const projects = await Project.query().with('user').paginate(page)

    return projects
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async store ({ request, auth }) {
    const data = await request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user')
    await project.load('tasks')

    return project
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = await request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project
  }

  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
