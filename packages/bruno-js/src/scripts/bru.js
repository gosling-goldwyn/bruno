
// Inbuilt Library Support
const atob = require('atob');
const btoa = require('btoa');
const _ = require('lodash');
const moment = require('moment');
const uuid = require('uuid');
const nanoid = require('nanoid');
const CryptoJS = require('crypto-js');

class Bru {
  constructor(environment, collectionVariables) {
    this._environment = environment;
    this._collectionVariables = collectionVariables;
  }

  require(module) {
    switch(module) {
      case 'atob':
        return atob;
      case 'btoa':
        return btoa;
      case 'lodash':
        return _;
      case 'moment':
        return moment;
      case 'uuid':
        return uuid;
      case 'nanoid':
        return nanoid;
      case 'crypto-js':
        return CryptoJS;
      default:
        throw new Error(`Module ${module} is not supported`);
    }
  }

  getEnvVar(key) {
    return this._environment[key];
  }

  setEnvVar(key, value) {
    if(!key) {
      throw new Error('Key is required');
    }

    // gracefully ignore if key is not present in environment
    if(!this._environment.hasOwnProperty(key)) {
      return;
    }

    this._environment[key] = value;
  }

  setVar(key, value) {
    if(!key) {
      throw new Error('Key is required');
    }

    this._collectionVariables[key] = value;
  }

  getVar(key) {
    return this._collectionVariables[key];
  }
}

module.exports = Bru;