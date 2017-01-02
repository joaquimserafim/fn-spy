/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

const test  = require('tape')

const fnSpy = require('./')

test('spy.calledCount', (assert) => {
  let s = fnSpy(foo)

  assert.deepEqual(s.calledCount(), 0, '0 calls 0 counts')

  s()
  assert.deepEqual(s.calledCount(), 1, '1 call 1 count')

  s()
  assert.deepEqual(s.calledCount(), 2, '2 calls 2 counts')

  assert.end()
})

test('spy.calledWith', (assert) => {
  let s = fnSpy(foo)

  assert.deepEqual(s.calledWith(), [], 'empty array at the beginning')

  s()
  assert.deepEqual(s.calledWith(), [], 'no args empty array')

  s(1)
  assert.deepEqual(
    s.calledWith(),
    [[1]],
    '`s(1)` passed should return the arg inside of an array[[1]]'
  )

  assert.end()
})

test('spy.restore', (assert) => {
  let s = fnSpy(foo)

  assert.deepEqual(
    s.restore(),
    foo,
    'calling `restore` should return the initial version of the function'
  )

  assert.end()
})

function foo (...args) {
  return args.length
}
