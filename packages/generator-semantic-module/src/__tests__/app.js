'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const {promisify} = require('es6-promisify');
const fs = require('fs');

const readFile = promisify(fs.readFile);

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

  it('creates files', async () => {
    await checkFiles([
      'commitlint.config.js',
      'commitizen.config.js',
      'package.json'
    ]);
  });
});

describe('create new module', async () => {
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

  it('creates files', async () => {
    await checkFiles([
      'commitlint.config.js',
      'package.json'
    ]);
  });
});

async function checkFiles(files) {
  assert.file(files);

  return Promise.all(files.map(async file => {
    const contents = await readFile(file);
    expect(contents.toString()).toMatchSnapshot(file);
  }));
}
