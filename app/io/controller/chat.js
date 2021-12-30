'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async chat () {
    const { ctx, app } = this;
    const message = ctx.args[0];
    console.log('chat', message);
    // await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    const users = await app.mysql.get('user', { _id: message.to });
    const namespace = app.io.of('/');
    await namespace.sockets[users.id] ? namespace.sockets[users.id].emit('chat', message) : ctx.socket.emit('chat', { msg: '不在线' });
    // await namespace.emit('chat', JSON.stringify(users));
  }
}

module.exports = ChatController;
