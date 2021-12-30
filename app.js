'use strict';
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async configWillLoad () {
    console.log('configWillLoad');

  }

  async didLoad () {
    console.log('didLoad');
  }

  async willReady () {
    console.log('willReady');
  }

  async didReady () {
    console.log('didReady');
  }

  async serverDidReady () {
    console.log('serverDidReady');
    const user = await this.app.mysql.query('update user set id = ("") ');
  }
}

module.exports = AppBootHook;
