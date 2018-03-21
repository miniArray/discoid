# discoid

[![Greenkeeper badge](https://badges.greenkeeper.io/miniArray/discoid.svg)](https://greenkeeper.io/)

[![Travis](https://img.shields.io/travis/miniArray/discoid.svg)](https://travis-ci.org/miniArray/discoid)
[![Codecov](https://img.shields.io/codecov/c/github/miniArray/discoid.svg)](https://codecov.io/github/miniArray/discoid)
[![npm](https://img.shields.io/npm/v/discoid.svg)](https://www.npmjs.com/package/discoid)
[![GitHub license](https://img.shields.io/github/license/miniArray/discoid.svg)](http://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/miniArray/discoid.svg)](https://github.com/miniArray/discoid/issues)
[![Dependeny Status](https://img.shields.io/david/miniArray/discoid.svg)](https://david-dm.org/miniArray/discoid/)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Gitter](https://img.shields.io/gitter/room/miniArray/discoid.svg)](https://gitter.im/miniArray/discoid)
[![Dev Dependency Status](https://img.shields.io/david/dev/miniArray/discoid.svg)](https://david-dm.org/miniArray/discoid/#info=devDependencies)

A simple utility to retrieve the host's volume (disk) info.

> Currently, only windows is supported.
> Support for POSIX (Linux, Mac, etc) is planned for the v1.0.0 release

## Setup

[![NPM](https://nodei.co/npm/discoid.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/discoid/)

```bash
npm install discoid
```

## Usage

```javascript
let discoid = require('discoid');

discoid.list()
    .then(console.log);
```
###### Output

```javascript
[{
	guid: '6f35a39a-4c5d-4208-ba6e-aa8d2a2add96',
	unc: '\\\\?\\Volume{6f35a39a-4c5d-4208-ba6e-aa8d2a2add96}\\',
	mounts: ['C:\\']
}, {
	guid: 'b0357aa2-c106-11e5-82ce-605718ebe2c1',
	unc: '\\\\?\\Volume{b0357aa2-c106-11e5-82ce-605718ebe2c1}\\'
}]
```

## License

MIT License
2015 © Simon W. Jackson and [contributors](https://github.com/miniArray/discoid/graphs/contributors)
