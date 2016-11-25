var audioContext = new AudioContext()

var ADSR = require('./index')


var attack = addSlider('attack', 0, 0.0001, 0, 10)
var decay = addSlider('decay', 0, 0.0001, 0, 10)
var sustain = addSlider('sustain', 1, 0.0001, 0, 2)
var release = addSlider('release', 0, 0.0001, 0, 10)

var startValue = addSlider('startValue', 0, 0.0001, 0, 2)
var endValue = addSlider('endValue', 0, 0.0001, 0, 2)

function getAdsr(){
  var adsr = ADSR(audioContext)
  adsr.attack = parseFloat(attack.value)
  adsr.decay = parseFloat(decay.value)
  adsr.sustain = parseFloat(sustain.value)
  adsr.release = parseFloat(release.value)
  adsr.startValue.value = parseFloat(startValue.value)
  adsr.endValue.value = parseFloat(endValue.value)
  return adsr
}

addButton('trigger 1s', function(){
  var adsr = getAdsr()
  var osc = audioContext.createOscillator()
  var gain = audioContext.createGain()
  osc.connect(gain)
  gain.connect(audioContext.destination)

  gain.gain.value = 0
  adsr.connect(gain.gain)
  
  osc.start(audioContext.currentTime)
  adsr.start(audioContext.currentTime)
  var endTime = adsr.stop(audioContext.currentTime+1)
  osc.stop(endTime)
})

var releaseHold = null

addButton('trigger hold', function(){
  var adsr = getAdsr()
  var osc = audioContext.createOscillator()
  var gain = audioContext.createGain()
  osc.connect(gain)
  gain.connect(audioContext.destination)

  gain.gain.value = 0
  adsr.connect(gain.gain)
  osc.start(audioContext.currentTime)
  adsr.start(audioContext.currentTime)

  releaseHold = function(){
    var endTime = adsr.stop(audioContext.currentTime)
    osc.stop(endTime)
  }

}, function(){
  releaseHold()
})

function addButton(name, down, up){
  var button = document.createElement('button')
  button.onmousedown = down
  button.onmouseup = up
  button.textContent = name
  document.body.appendChild(button)
}

function addSlider(property, defaultValue, step, min, max){
  var container = document.createElement('div')
  container.appendChild(document.createTextNode(property))
  var label = document.createTextNode(defaultValue)
  var slider = document.createElement('input')
  slider.type = 'range'
  slider.min = min
  slider.max = max
  slider.value = defaultValue

  slider.style.width = '300px'

  if (step){
    slider.step = step
  }

  slider.onchange = function(){
    label.data = this.value
  }

  container.appendChild(slider)
  container.appendChild(label)
  document.body.appendChild(container)
  return slider
}