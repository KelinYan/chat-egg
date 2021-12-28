'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async chat () {
    const { ctx, app } = this;
    const message = JSON.parse(ctx.args[0]);
    console.log('chat', message);
    // await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    const users = await app.mysql.get('user', { _id: message.to });
    console.log('totototo', users);
    const namespace = app.io.of('/');
    console.log(namespace.sockets, users.id);
    await namespace.sockets[users.id] ? namespace.sockets[users.id].emit('chat', JSON.stringify(message)) : ctx.socket.emit('chat', { msg: '不在线' });
    // await namespace.emit('chat', JSON.stringify(users));
  }
}

module.exports = ChatController;
