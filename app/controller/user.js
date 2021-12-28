'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async list () {
    const { ctx, app } = this;
    const users = await app.mysql.select('user', { columns: ['_id', 'id', 'name'] });
    console.log(users);
    ctx.set('Content-Type', 'text/json');
    ctx.body = JSON.stringify(users);
  }
  async update (id) {
    const { ctx, app } = this;
    if (!app.user) app.user = [];
    console.log(app.user);
    ctx.set('Content-Type', 'text/xml');
    ctx.body = JSON.stringify(app.user);
  }
  async login () {
    const { ctx, app } = this;
    const id = ctx.query.id;
    const user = await app.mysql.get('user', { _id: id });
    ctx.set('Content-Type', 'text/json');
    ctx.body = JSON.stringify(user);
  }
}

module.exports = HomeController;
