/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

const spy = module.exports = spyFn

function spyFn (fn) {
  let count = 0
  let args  = []

  const call = function call (...theArgs) {
    count++
    args.push(theArgs)
    return fn.apply(null, theArgs)
  }

  call.calledWith = () => { return args }
  call.calledCount = () => { return count }
  call.restore = () => { return fn }

  return call
}

spy.emitter = spyCallbacks
spy.callback = spyCallbacks

function spyCallbacks () {
  return spyFn(replicant)
}

function replicant () {}
