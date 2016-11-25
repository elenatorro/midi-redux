
module.exports = function (player) {
  /**
   * Adds a listener of an event
   * @chainable
   * @param {String} event - the event name
   * @param {Function} callback - the event handler
   * @return {SamplePlayer} the player
   * @example
   * player.on('start', function(time, note) {
   *   console.log(time, note)
   * })
   */
  player.on = function (event, cb) {
    if (arguments.length === 1 && typeof event === 'function') return player.on('event', event)
    var prop = 'on' + event
    var old = player[prop]
    player[prop] = old ? chain(old, cb) : cb
    return player
  }
  return player
}

function chain (fn1, fn2) {
  return function (a, b, c, d) { fn1(a, b, c, d); fn2(a, b, c, d) }
}
