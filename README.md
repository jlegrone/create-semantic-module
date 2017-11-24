# Create Semantic Module

[![Build Status][travis-image]][travis-url]
[![Coverage percentage][codecov-image]][codecov-url]

> `create-semantic-module` makes it easy to start using [conventional commits](https://conventionalcommits.org/) in new or existing projects.

Adding conventional commits to your development workflow can be a big change when you work on a project with multiple contributors.

Tools like [commitizen](http://commitizen.github.io/cz-cli/) and [commitlint](http://marionebl.github.io/commitlint) do a great job of easing this transition, but configuring them to work together requires some boilerplate.  That's where `create-semantic-module` comes in!

## Usage

Generate a new project:

```bash
yarn create semantic-module my-module-name
```

Or run from within an existing project:

```bash
cd ./my-module-name
yarn create semantic-module
```

If using npm 5.2.0 or later, you can also use `npx`:
```bash
npx create-semantic-module my-module-name
```

## License

MIT © [Jacob LeGrone](https://jacoblegrone.com)


[travis-image]: https://travis-ci.org/jlegrone/create-semantic-module.svg?branch=master
[travis-url]: https://travis-ci.org/jlegrone/create-semantic-module
[codecov-image]: https://codecov.io/gh/jlegrone/create-semantic-module/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/jlegrone/create-semantic-module
