'use strict';

const fs = require('fs');
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
      port: 8080,
      ip: '127.0.0.1',
      domain: 'localhost'
    }
    break;
  case Environments.PROD:
    env_server = {
      port: 80,
      ip: 'MISSING IP',
      domain: 'http://www.nickzuber.com/'
    }
    break;
  default:
    throw new Error('Attempted to set an unknown evnironment.')
}

exports.server = env_server;
