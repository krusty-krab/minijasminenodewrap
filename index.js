/* jshint node: true */
'use strict';

var miniJasmineLib = require('minijasminenode2');
var multiGlob = require('multi-glob');
var path = require('path');
var argv = require('yargs').argv;
var configFile = path.normalize(process.cwd() + '/jasmine-config.js');
var krustyJasmineReporter = require('krusty-jasmine-reporter');

var options;
try {
  options = require(configFile);
} catch (e) {
  options = {};
}

var specs;
if (argv._.length)
  specs = argv._;
else if (options.specs && options.specs.length)
  specs = options.specs;

//Get the files.
if (specs)
  multiGlob.glob(specs, { strict: true }, function (err, files) {
    if (err) throw err;

    options.specs = files;

    execute();
  });
else
  execute();

function execute() {
  if (argv.reportType === 'junit') {
    options.JUnitReportSavePath = argv.JUnitReportSavePath || options.JUnitReportSavePath || './';
    options.JUnitReportFilePrefix = argv.JUnitReportFilePrefix || options.JUnitReportFilePrefix || 'results';
    options.JUnitReportSuiteName = argv.JUnitReportSuiteName || options.JUnitReportSuiteName || 'Tests';
    options.JUnitReportPackageName = argv.JUnitReportPackageName || options.JUnitReportPackageName || 'Tests';
    miniJasmineLib.addReporter(new krustyJasmineReporter.KrustyJasmineJUnitReporter(options));
  }

  miniJasmineLib.executeSpecs(options);
}
