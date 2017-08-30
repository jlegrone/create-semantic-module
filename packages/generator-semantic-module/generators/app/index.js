'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

const options = {
  moduleName: 'module-name',
  packager: 'packager',
  semanticRelease: 'semantic-release',
  commitizenAdapter: 'commitizen-adapter',
  commitlintConfig: 'commitlint-config'
};

const defaults = {
  [options.packager]: 'npm',
  [options.semanticRelease]: false,
  [options.commitizenAdapter]: '@commitlint/prompt',
  [options.commitlintConfig]: '@commitlint/config-angular'
};

module.exports = class extends Generator {
  constructor([moduleName]) {
    super(...arguments);

    if (moduleName) {
      this.destinationRoot(moduleName);
      this.config.set({[options.moduleName]: moduleName});
    }

    this.config.defaults(defaults);
  }

  async prompting() {
    this.log(yosay('No bad commits for you!'));

    const commitLintDefault = this.config.get(options.commitlintConfig);
    const commitLintConfigValues = [
      '@commitlint/config-angular',
      '@commitlint/config-lerna-scopes',
      '@commitlint/config-patternplate'
    ];

    const prompts = [
      {
        type: 'list',
        name: options.packager,
        message: 'Which packager do you use?',
        default: this.config.get(options.packager),
        choices: ['npm', 'yarn']
      },
      // {
      //   type: 'confirm',
      //   name: options.semanticRelease,
      //   message: 'Enable semantic-release?',
      //   default: this.config.get(options.semanticRelease)
      // },
      {
        type: 'list',
        name: options.commitizenAdapter,
        message: 'Which commitizen adapter do you prefer?',
        default: this.config.get(options.commitizenAdapter),
        choices: ['@commitlint/prompt', 'cz-customizable']
      },
      {
        type: 'list',
        name: options.commitlintConfig,
        message: 'Which commitlint configuration would you like to extend?',
        default:
          commitLintConfigValues.indexOf(commitLintDefault) > -1 ?
            commitLintDefault :
            commitLintDefault ? 'custom' : 'none',
        choices: [
          ...commitLintConfigValues,
          {type: 'separator'},
          'custom',
          'none'
        ]
      }
    ];

    let props = await this.prompt(prompts);
    if (props[options.commitlintConfig] === 'custom') {
      props = await this.prompt([
        {
          type: 'input',
          name: options.commitlintConfig,
          message: 'What is the package name of your custom commitlint config?',
          default: commitLintDefault
        }
      ]);
    } else if (props[options.commitlintConfig] === 'none') {
      props[options.commitlintConfig] = false;
    }

    this.config.set(props);
  }

  writing() {
    const config = this.config.getAll();

    let commitLintTemplate = 'commitlint.config.js';
    const packageJSON = {
      config: {
        commitizen: {
          path: `node_modules/${config[options.commitizenAdapter]}`
        }
      },
      scripts: {
        commit: 'git-cz',
        'commit:retry': 'git-cz --retry',
        commitmsg: 'commitlint -e'
      }
    };

    if (config[options.commitizenAdapter] === 'cz-customizable') {
      commitLintTemplate = 'commitlint-commitizen.config.js';
      packageJSON.config['cz-customizable'] = {
        config: 'commitizen.config.js'
      };
      this.fs.copy(
        this.templatePath('commitizen.config.js'),
        this.destinationPath('commitizen.config.js')
      );
    }

    this.fs.copyTpl(
      this.templatePath(commitLintTemplate),
      this.destinationPath('commitlint.config.js'),
      {commitlintConfig: this.config.get(options.commitlintConfig)}
    );

    this.fs.extendJSON(this.destinationPath('package.json'), packageJSON);
  }

  install() {
    const packages = [
      'commitizen',
      '@commitlint/cli',
      'husky',
      this.config.get(options.commitizenAdapter)
    ];

    const commitLintConfig = this.config.get(options.commitlintConfig);
    if (commitLintConfig) {
      packages.push(commitLintConfig);
    }

    if (this.config.get(options.semanticRelease)) {
      packages.push('semantic-release');
    }

    const packager = this.config.get(options.packager);
    this.runInstall(packager, packages, {
      [packager === 'yarn' ? 'dev' : 'save-dev']: true
    });
  }
};
