'use strict';
var Code = require('code');
var ESLint = require('eslint');
var Lab = require('lab');
var HapiCapitalizeModules = require('../lib');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;
var linter = ESLint.linter;
var linterConfig = {rules: {}, env: {es6: true}}; // ES6 used to test destructuring

Code.settings.truncateMessages = false;
linter.defineRule(HapiCapitalizeModules.esLintRuleName, HapiCapitalizeModules);

describe('ESLint Rule', function() {
  it('reports warning when module is not capitalized', function(done) {
    var code = [
      'var hapi = require("hapi");',
      'var poop; poop = require("poop");'
    ];

    linterConfig.rules[HapiCapitalizeModules.esLintRuleName] = 1;

    for (var i = 0; i < code.length; ++i) {
      var result = linter.verify(code[i], linterConfig);

      expect(result).to.be.an.array();
      expect(result.length).to.equal(1);
      expect(result[0].ruleId).to.equal(HapiCapitalizeModules.esLintRuleName);
      expect(result[0].message).to.equal('Imported module variable name not capitalized.');
      expect(result[0].nodeType).to.match(/VariableDeclarator|AssignmentExpression/);
    }

    done();
  });

  it('does not report anything if module variable is capitalized', function(done) {
    var code = [
      'var Hapi = require("hapi");',
      'var Poop; Poop = require("poop");'
    ];

    linterConfig.rules[HapiCapitalizeModules.esLintRuleName] = 1;

    for (var i = 0; i < code.length; ++i) {
      var result = linter.verify(code[i], linterConfig);

      expect(result).to.be.an.array();
      expect(result.length).to.equal(0);
    }

    done();
  });

  it('does not report anything for non-module variables', function(done) {
    var code = [
      'var foo, bar, baz;',
      'var foo = fn()',
      'var foo = "string";',
      'var foo = this.bar()',
      'foo[bar] = 5;',
      'this.foo = null;',
      '[foo, bar] = [1, 2];',
      '[foo, bar] = require("baz");'
    ];

    linterConfig.rules[HapiCapitalizeModules.esLintRuleName] = 1;

    for (var i = 0; i < code.length; ++i) {
      var result = linter.verify(code[i], linterConfig);

      expect(result).to.be.an.array();
      expect(result.length).to.equal(0);
    }

    done();
  });
});
