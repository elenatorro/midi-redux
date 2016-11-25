'use strict'

var note = require('note-parser')
var load = require('audio-loader')

/**
 * Load the buffers of a given instrument name
 * @param {AudioContext} ac - the audio context
 * @param {String} name - the instrument name (it accepts an url if starts with "http")
 * @param {Object} options - (Optional) options object
 * The options object accepts (all optional):
 *
 * - notes: the list of note names to be decoded
 */
function loadBuffers (ctx, name, options) {
  var nameToUrl = name.startsWith('http') ? function (x) { return x }
    : options && options.nameToUrl ? nameToUrl
    : gleitzUrl
  var opts = options && options.notes ? { only: options.notes } : {}
  return load(ctx, nameToUrl(name), opts).then(function (buffers) {
    return Object.keys(buffers).reduce(function (midified, key) {
      midified[note.midi(key)] = buffers[key]
      return midified
    }, {})
  })
}

/*
 * Given an instrument name returns a URL to to the Benjamin Gleitzman's
 * package of [pre-rendered sound fonts](https://github.com/gleitz/midi-js-soundfonts)
 *
 * @param {String} name - instrument name
 * @returns {String} the Soundfont file url
 */
function gleitzUrl (name) {
  return 'https://cdn.rawgit.com/gleitz/midi-js-Soundfonts/master/FluidR3_GM/' + name + '-ogg.js'
}

var Soundfont = require('./legacy')
Soundfont.loadBuffers = loadBuffers
Soundfont.nameToUrl = gleitzUrl

if (typeof module === 'object' && module.exports) module.exports = Soundfont
if (typeof window !== 'undefined') window.Soundfont = Soundfont
