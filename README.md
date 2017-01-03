# fn-spy

creating spies for your functions

----
<a href="https://nodei.co/npm/fn-spy/"><img src="https://nodei.co/npm/fn-spy.png?downloads=true"></a>

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square)](https://travis-ci.org/joaquimserafim/fn-spy)![Code Coverage 100%](https://img.shields.io/badge/code%20coverage-100%25-green.svg?style=flat-square)[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://github.com/joaquimserafim/fn-spy/blob/master/LICENSE)[![NodeJS](https://img.shields.io/badge/node-6.1.x-brightgreen.svg?style=flat-square)](https://github.com/joaquimserafim/fn-spy/blob/master/package.json#L38)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


### api
`const spy = require('fn-spy')`

**spy.calledCount()** integer, returns the number of times a function as called

**spy.calledWith()** array, returns the arguments passed to the function

**spy.restore()** function, restores the function to the initial state


### example

```js
const spy = require('fn-spy')

function foo (...args) {
  return args.length
}

let spiedFn = spy(foo)

// calledCount
spiedFn()
spiedFn()
spiedFn.calledCount()// will return 2

// calledWith
spiedFn(1, 2, 3)
spiedFn.calledWith()// will return [[1, 2, 3]]

// restore
spiedFn = spiedFn.restore()// now spiedFn is retored to the initial state
```


#### ISC License (ISC)
