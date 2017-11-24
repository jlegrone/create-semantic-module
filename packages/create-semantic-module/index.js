var yeoman = require('yeoman-environment');

function createSemanticModule(args) {
  var env = yeoman.createEnv();

  env.register(
    require.resolve('generator-semantic-module'),
    'semantic-module:app'
  );

  env.run('semantic-module:app', {
    packager: 'yarn',
    'module-name': (args || [])[0]
  });
}

module.exports = createSemanticModule;
