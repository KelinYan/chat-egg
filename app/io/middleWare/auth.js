'use strict';
// app/io/middlewware/auth.js
// 这个中间件的作用是提示用户连接与断开的，连接成功的消息发送到客户端，断开连接的消息在服务端打印
// module.exports = app => {
//   return function* (next) {
//     app.user = app.user ? [...app.user] : [this.socket];
//     this.socket.emit('res', 'connected!');
//     yield* next;
//     console.log('disconnection!');
//   };
// };

module.exports = app => {
  return async (ctx, next) => {
    const { socket } = ctx;
    // console.log('connection!', session.user);
    // console.log('ccc', socket.id);
    const query = socket.handshake.query;
    console.log('query', query.id, socket.id);
    await app.mysql.update('user', { id: socket.id }, { where: { _id: query.id } });
    const users = await app.mysql.select('user', { columns: ['_id', 'id', 'name'] });
    const namespace = app.io.of('/');
    namespace.emit('userChange', JSON.stringify(users));
    socket.emit('connected', socket.id);
    await next();
    await app.mysql.update('user', { id: '' }, { where: { _id: query.id } });
    // execute when disconnect.
    console.log('disconnection!');
  };
};
