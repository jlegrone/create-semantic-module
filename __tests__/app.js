'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-semantic-module:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      packager: 'yarn',
      'semantic-release': false,
      'commitizen-adapter': 'cz-customizable',
      'commitlint-config': '@commitlint/config-angular'
    });
  });

  it('creates files', () => {
    assert.file([
      'commitlint.config.js',
      'commitizen.config.js',
      'package.json'
    ]);
  });
});
