<a href="http://hapijs.com"><img src="https://raw.githubusercontent.com/hapijs/assets/master/images/family.png" width="180px" align="right" /></a>

# rule-capitalize-modules

[![Build Status](https://travis-ci.org/hapijs/rule-capitalize-modules.svg?branch=master)](https://travis-ci.org/hapijs/rule-capitalize-modules)

ESLint rule to enforce the capitalization of imported module variables.

## Rule options

### `global-scope-only`

If the string `'global-scope-only'` is passed as the first option to this rule,
then it will only be enforced on assignments in the module's top level scope.
