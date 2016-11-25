'use strict'

var oscillatorPlayer = require('./oscillator-player')
var bankPlayer = require('./bank-player')

/**
 * Create a Soundfont object
 *
 * @param {AudioContext} context - the [audio context](https://developer.mozilla.org/en/docs/Web/API/AudioContext)
 * @param {Function} nameToUrl - (Optional) a function that maps the sound font name to the url
 * @return {Soundfont} a soundfont object
 */
function Soundfont (ctx, nameToUrl) {
  if (!(this instanceof Soundfont)) return new Soundfont(ctx)

  this.nameToUrl = nameToUrl || Soundfont.nameToUrl
  this.ctx = ctx
  this.instruments = {}
  this.promises = []
}

Soundfont.prototype.onready = function (callback) {
  Promise.all(this.promises).then(callback)
}

Soundfont.prototype.instrument = function (name, options) {
  var ctx = this.ctx
  name = name || 'default'
  if (name in this.instruments) return this.instruments[name]
  var inst = {name: name, play: oscillatorPlayer(ctx, options)}
  this.instruments[name] = inst
  if (name !== 'default') {
    console.log('Load ', name)
    var promise = Soundfont.loadBuffers(ctx, name, options).then(function (bank) {
      inst.play = bankPlayer(ctx, bank, options)
      return inst
    })
    this.promises.push(promise)
    inst.onready = function (cb) { promise.then(cb) }
  } else {
    inst.onready = function (cb) { cb() }
  }
  return inst
}

module.exports = Soundfont
