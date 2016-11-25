'use strict'

var note = require('note-parser')
var isMidi = function (n) { return n !== null && n !== [] && n >= 0 && n < 129 }
var toMidi = function (n) { return isMidi(n) ? +n : note.midi(n) }

// Adds note name to midi conversion
module.exports = function (player) {
  if (player.buffers) {
    var map = player.opts.map
    var toKey = typeof map === 'function' ? map : toMidi
    var mapper = function (name) {
      return name ? toKey(name) || name : null
    }

    player.buffers = mapBuffers(player.buffers, mapper)
    var start = player.start
    player.start = function (name, when, options) {
      var key = mapper(name)
      var dec = key % 1
      if (dec) {
        key = Math.floor(key)
        options = Object.assign(options || {}, { cents: Math.floor(dec * 100) })
      }
      return start(key, when, options)
    }
  }
  return player
}

function mapBuffers (buffers, toKey) {
  return Object.keys(buffers).reduce(function (mapped, name) {
    mapped[toKey(name)] = buffers[name]
    return mapped
  }, {})
}
