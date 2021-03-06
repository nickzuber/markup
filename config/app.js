'use strict';

const DEV_FLAG = require('../env').DEV_FLAG

var env_server = {};

const Environments = {
  'DEV': 'development',
  'PROD': 'production'
}

exports.env = DEV_FLAG ? Environments.DEV : Environments.PROD;

switch (exports.env) {
  case Environments.DEV:
    env_server = {
      port: 80,
      ip: '127.0.0.1',
      hostname: 'http://markup.dev',
		  apiHostname: 'http://api.markup.dev',
      domain: 'localhost'
    }
    break;
  case Environments.PROD:
    env_server = {
      port: 80,
      ip: '127.0.0.1',
      hostname: 'https://markup-app.com',
      apiHostname: 'https://api.markup-app.com',
      domain: 'markup-app.com'
    }
    break;
  default:
    throw new Error('Attempted to set an unknown evnironment.')
}

exports.server = env_server;
