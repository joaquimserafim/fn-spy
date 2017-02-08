/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

const test  = require('tape')
const EE    = require('events')

const fnSpy = require('.')

test('spy.calledCount', (assert) => {
  const spy = fnSpy(foo)

  assert.deepEqual(spy.calledCount(), 0, '0 calls 0 counts')

  spy()
  assert.deepEqual(spy.calledCount(), 1, '1 call 1 count')

  spy()
  assert.deepEqual(spy.calledCount(), 2, '2 calls 2 counts')

  assert.end()
})

test('spy.calledWith', (assert) => {
  const spy = fnSpy(foo)

  assert.deepEqual(spy.calledWith(), [], 'empty array at the beginning')

  spy()
  assert.deepEqual(spy.calledWith(), [[]], 'no args empty array')

  spy(1)
  assert.deepEqual(
    spy.calledWith(),
    [[], [1]],
    '`calledWith` should return [[], [1]]'
  )

  assert.end()
})

test('spy.restore', (assert) => {
  let spy = fnSpy(foo)

  assert.notDeepEqual(spy, foo, 'functions should not match ')

  spy = spy.restore()

  assert.deepEqual(
    spy,
    foo,
    'calling `restore` should return the initial version of the function'
  )

  assert.end()
})

test('spied function should be executed', (assert) => {
  const spy = fnSpy(foo)

  assert.deepEqual(spy(1, 2, 3), 3, 'should return 3')

  assert.end()
})

test('spy an emitter function', (assert) => {
  const myEmitter = new EE()
  const spy = fnSpy.emitter()

  myEmitter.on('hey', spy)

  assert.deepEqual(spy.calledCount(), 0, '0 calls 0 counts')
  assert.deepEqual(spy.calledWith(), [], 'no arguments passed')

  myEmitter.emit('hey', 1)
  myEmitter.emit('hey', 2)

  assert.deepEqual(spy.calledCount(), 2, '2 calls 2 counts')
  assert.deepEqual(
    spy.calledWith(),
    [[1], [2]],
    'should return the arguments passed to emitter function'
  )

  assert.end()
})

test('spy a callback function', (assert) => {
  const spy = fnSpy.callback()

  function someAsyncFn (cb) {
    cb()
  }

  assert.deepEqual(spy.calledCount(), 0, '0 calls 0 counts')
  assert.deepEqual(spy.calledWith(), [], 'no arguments passed')

  someAsyncFn(spy)

  assert.deepEqual(spy.calledCount(), 1, '1 calls 1 counts')
  assert.deepEqual(spy.calledWith(), [[]], 'no arguments passed')

  assert.end()
})

test('spy a callback function and arguments', (assert) => {
  const spy = fnSpy.callback()

  function someAsyncFn (a, b, cb) {
    cb(a, b)
  }

  assert.deepEqual(spy.calledCount(), 0, '0 calls 0 counts')
  assert.deepEqual(spy.calledWith(), [], 'no arguments passed')

  someAsyncFn(1, 2, spy)

  assert.deepEqual(spy.calledCount(), 1, '1 calls 1 counts')
  assert.deepEqual(spy.calledWith(), [[1, 2]], 'no arguments passed')

  assert.end()
})

function foo (...args) {
  return args.length
}
