#!/usr/bin/env node

var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();

env.register(
  require.resolve('generator-semantic-module'),
  'semantic-module:app'
);

env.run('semantic-module:app', {
  packager: 'yarn',
  'module-name': process.argv[2]
});
