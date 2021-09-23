less2sass-mv
=========

This is a fork from [ekryski/less2sass](https://github.com/ekryski/less2sass).

[![Build Status](https://travis-ci.org/MonsieurV/less2sass.svg?branch=master)](https://travis-ci.org/MonsieurV/less2sass)

A little script to convert less to Sass files.

> **Note: Due to the nature of less and sass it does not do a completely perfect conversion. You will have to do some manual work :-(**

## Installing

`npm install -g less2sass-mv`

## Running

You can run less2sass on a single file or on entire directory. It will recurse through the directory and convert any less files to Scss, preserving the directory structure.

`less2sass-mv <path_to_less_file_or_directory>`

## Caveats

* This does not really convert color functions, it makes a best attempt but most color functions will need to be ported over manually
* It does not convert to proper `.sass` yet. Only to `.scss`. (But you can use [sass-convert](http://sass-lang.com/documentation/#sass-convert) to then convert to `.sass`)
* It may be buggy so you have to check your code but hopefully this script will save you some time. If you come across a bug, please create [an issue](https://github.com/MonsieurV/less2sass/issues). Better yet, a pull request!

## Contributing

### Development

Install dependencies:

```sh
npm install
```

First write tests in [`test`](/test), then make your changes and check them:

```sh
npm test
```

## Credits

Written by Eric Kryski, forked and maintained by Yoan Tournade.