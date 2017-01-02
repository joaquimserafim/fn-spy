/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

module.exports = spy

function spy (fn) {
  let count = 0
  let args  = []

  function call (...theArgs) {
    count++
    theArgs.length && args.push(theArgs)
    return fn.apply(null, theArgs)
  }

  call.calledWith = () => { return args }
  call.calledCount = () => { return count }
  call.restore = () => { return fn }

  return call
}
