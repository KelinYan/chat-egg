'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.post('/user/update/:id', controller.user.update);
  router.get('/user/list/', controller.user.list);
  router.get('/user/login', controller.user.login);

  io.of('/').route('chat', io.controller.chat.chat);
};
