minijasminenodewrap
===================

A simple wrapper around [minijasminenode2](https://github.com/juliemr/minijasminenode). 
Mostly used to allow globs from the CLI or within the config.

Install
=======

`npm install minijasminenodewrap --save`

Use
===

Minijasminenodewrap looks for a `config.js` file within the current working directory.
The `config.js` file should return an `object` of `options` matching the ones provided to
`miniJasmineLib.executeSpecs()`.

```javascript
module.exports = {
  {
    // An array of filename globs, relative to current dir.
    specs: ['spec/**/*.js'],
    // A function to call on completion.
    // function(passed)
    onComplete: function(passed) { console.log('done!'); },
    // If true, display suite and spec names.
    isVerbose: false,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Time to wait in milliseconds before a test automatically fails
    defaultTimeoutInterval: 5000
};
```

`minijasminenodewrap` allows `options.specs` to be an array of globs instead of just file paths.
The globs will be expanded before running the tests.

You can also invoke `minjjasminenodewrap` with arguments representing spec globs.
If you do this, the globs will replace anything currently listed in `options.specs`

```bash
  $ ./node_modules/.bin/mjnw 'spec/**/*.js' 'more/specs/**/*.js'
```