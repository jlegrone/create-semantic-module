'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('use command line arguments', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        packager: 'yarn'
      })
      .withPrompts({
        'commitizen-adapter': 'cz-customizable',
        'commitlint-config': 'custom'
      })
      .withPrompts({
        'commitlint-config': '@commitlint/config-lerna-scopes'
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

describe('create new module', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['my-module'])
      .withPrompts({
        packager: 'npm',
        'commitizen-adapter': '@commitlint/prompt',
        'commitlint-config': 'none'
      });
  });

  it('creates package directory', () => {
    expect(process.cwd().endsWith('/my-module')).toBe(true);
  });

  it('creates files', () => {
    assert.file([
      'commitlint.config.js',
      'package.json'
    ]);
  });
});
