#!/usr/bin/env node

var path = require('path');

if(!process.env.NODE_ENV)
  process.env.NODE_ENV = 'test';

require(path.join(__dirname,'../index.js'));
