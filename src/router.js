'use strict';

import Backbone from 'backbone';
import Promise from 'bluebird';
import {
  addClass,
  removeClass
} from './utilities/general';

const Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    '/': 'home',

    'edit': 'edit',
    '/edit': 'edit',
    'edit/': 'edit',
    '/edit/': 'edit',

    'edit/:id': 'edit',
    '/edit/:id': 'edit',

    '*nuts': 'notFound'
  },

  home () {
    this.current = 'home';
  },

  edit (id) {
    console.log(id)
    this.current = 'edit';
  },

  notFound (nuts) {
    this.notFoundURL = nuts || '';
    this.current = '404';
  },

  execute (callback, args, name) {
    // something to do before we load the new page
    new Promise ((resolve) => {
      resolve(callback.apply(this, args));
    }).then(() => {
      // something when we're done loading the new page
    }).catch((err) => {
      console.warn(`An error has occured when attempting to route to a page: ${err}`);
    });
  }
});

const router = new Router();
export default router;

Backbone.history.start({
  pushState: true
});
