/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

const spy = module.exports = spyFn

function spyFn (fn, that) {
  let count   = 0
  let args    = []
  let values  = []

  const call = (...theArgs) => {
    count++
    args.push(theArgs)
    const output = fn.apply(that, theArgs)
    values.push(output)
    return output
  }

  call.calledWith = () => { return args }
  call.calledCount = () => { return count }
  call.getReturns = () => { return values }
  call.restore = () => { return fn }

  return call
}

spy.emitter = spyCallbacks
spy.callback = spyCallbacks

function spyCallbacks () {
  return spyFn(replicant)
}

function replicant () {}
