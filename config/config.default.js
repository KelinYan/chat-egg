/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640173033642_1665';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    io: {
      namespace: {
        '/': {
          connectionMiddleware: ['auth'],
          packetMiddleware: ['filter'],
        },
      },
    },
    mysql: {
      client: {
        // host
        host: '49.232.63.202',
        // 端口号
        port: '3306',
        // 用户名
        user: 'websql',
        // 密码
        password: '123456',
        // 数据库名
        database: 'websql',
      },
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
