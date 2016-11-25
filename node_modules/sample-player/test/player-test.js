/* globals describe it */
var assert = require('assert')
var Player = require('..')
var Audio = require('./support/audio')

describe('player', function () {
  describe('connect', function () {
    it('returns the player instance', function () {
      var audio = new Audio('snare')
      var player = Player(audio.ac, audio.buffers)
      assert.equal(player.connect(audio.ac.destination), player)
    })
    it('connects to the ac.destination', function () {
      var audio = new Audio('snare')
      var player = Player(audio.ac, audio.buffers)
      assert.equal(player.connect(audio.ac.destination), player)
      assert.deepEqual(audio.output(),
        { name: 'GainNode', gain: { value: 1, inputs: [] }, inputs: [] })
    })
  })
  describe('start', function () {
    it('has no need of name if only one buffer', function () {
      var audio = new Audio('snare')
      var player = Player(audio.ac, audio.ac.createBuffer(2, 10, 44100)).connect(audio.ac.destination)
      player.start()
      assert.equal(audio.played().length, 1)
      assert.equal(audio.played(0).buffer.length, 10)
    })
    it('needs name if more than one buffer', function () {
      var audio = new Audio('one two')
      var player = Player(audio.ac, audio.buffers).connect(audio.ac.destination)
      player.start('one')
      player.start('two')
      assert.equal(audio.played().length, 2)
      assert.equal(audio.played(0).bufferName, 'one')
      assert.equal(audio.played(1).bufferName, 'two')
    })
  })
  describe('stop', function () {
    it('should stop all buffers', function () {
      var audio = new Audio('one two')
      var player = Player(audio.ac, audio.buffers).connect(audio.ac.destination)
      player.start('one')
      player.start('two')
      player.stop()
    })
  })
})
