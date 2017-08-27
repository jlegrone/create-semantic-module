'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-semantic-module:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({packager: 'yarn'});
  });

  it('creates files', () => {
    assert.file([
      'commitlint.config.js',
      'commitizen.config.js',
      'package.json'
    ]);
  });
});
