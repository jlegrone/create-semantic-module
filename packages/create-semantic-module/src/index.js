import {createEnv} from 'yeoman-environment';

function createSemanticModule(args) {
  const env = createEnv();

  env.register(
    require.resolve('generator-semantic-module'),
    'semantic-module:app'
  );

  env.run('semantic-module:app', {
    'module-name': (args || [])[0]
  });
}

module.exports = createSemanticModule;
