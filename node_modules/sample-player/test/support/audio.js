/* globals AudioContext */
require('web-audio-test-api')

module.exports = function Audio (keys) {
  var ac = new AudioContext()
  var names = !keys ? [] : keys.split ? keys.split(' ') : keys || []
  var buffers = {}
  names.forEach(function (key, i) {
    buffers[key] = ac.createBuffer(2, i, 44100)
  })
  function output () {
    return ac.toJSON().inputs[0]
  }
  function played (i) {
    if (arguments.length > 0) return played()[i]
    return output().inputs.map(function (input) {
      var amp = input
      var source = amp.inputs[0]
      var buffer = source.buffer
      var bufferName = names[buffer.length]
      return { amp, source, buffer, bufferName }
    })
  }
  return { ac, buffers, output, played }
}
