'use strict';

import Backbone from 'backbone';

const Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    '/': 'home',
    '*nuts': 'notFound'
  },

  home() {
    this.current = 'home';
  },

  notFound(nuts) {
    this.notFoundURL = nuts || '';
    this.current = '404';
  },

  execute(callback, args, name) {
    // I can do something here every time we route to another page
    if (callback) {
      callback.apply(this, args);
    }
  }
});

const router = new Router();
export default router;

Backbone.history.start({
  pushState: true
});
