# Unit tests

Thanks for writing tests! Here's a quick run-down on our current setup.
**...you can find "How it works" at the end of this file**

#IMPORTANT!!!!
We use KARMA & MOCHA ( that can change )
- karma has coverage
- mocha has best html reporter

#### Tools we use

Please familiarise yourself with these if you plan on contributing! :+1:

 - [enzyme](https://github.com/airbnb/enzyme)
 - [mocha](https://mochajs.org)
 - [chai](http://chaijs.com)
 - [jsdom](https://github.com/tmpvar/jsdom)
 - [mocha-webpack] (https://github.com/zinserjan/mocha-webpack)

## Commands

##### Run single unit tests
`npm run test:karma`
`npm run test:mocha`
( only mocha will generate html reports )

##### Run unit tests ( watch )
`npm run test:karma:watch`
`npm run test:mocha:watch`
( only mocha will generate html reports )

##### Run coverage
`npm run test:karma:coverage`
(only karma supports coverage)

## Writing Tests

For all unit tests, please use the [shallow renderer](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md) from `enzyme` unless the Component being tested requires a DOM. [Here's](https://github.com/callemall/material-ui/blob/master/src/Avatar/Avatar.spec.js) a small shallow rendered test to get you started.

If the Component being unit tested requires a DOM, you can use the [mount api](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md) from `enzyme`. For some operations you may still need to use the React test utils, but try to use the `enzyme` API as much as possible.

Stick to test assertions such as `assert.strictEqual` and `assert.ok`. This helps keep tests simple and readable.

## How it works ( karma )
1. `npm run test` run karma over **babel-node**
2. execute: test/karma.conf.js
3. karma.conf will parse process.argv by optimistic module
    * allowed args
        * --single-run
        * --coverage
4. Karma
    * config contains **webpack** config file from tools/webpack-configs/**webpack.karma.js**
    * files are included from **webpack**, but webpack conf is missing the **entry** ( no files specified in webpack config )
    * files will be loaded by **karma.tests.js**
    * different files will be provided for --coverage - **karma.coverage.tests.js**
    * regex for spec files: `'../src/', true, /\.spec\.(js|jsx)$/`
    * coverage
        * all files for coverage has to be manually required in **karma.coverage.tests.js**
        * DO NOT include client.js ( tests will fail due to unable to mount react on non existing element )
