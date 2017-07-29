'use strict';

var env_server = {};

// Set flag on when in development mode
const DEV_FLAG = 1;

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
      hostname: 'http://markup.pw',
      apiHostname: 'http://api.markup.pw',
      domain: 'markup.pw'
    }
    break;
  default:
    throw new Error('Attempted to set an unknown evnironment.')
}

exports.server = env_server;
