# midimessage

[![npm version](https://badge.fury.io/js/midimessage.svg)](http://badge.fury.io/js/midimessage)

Simple MIDI Message Parser for JavaScript. This parser takes in a [MIDIMessageEvent](http://webaudio.github.io/web-midi-api/#MIDIMessageEvent) and returns a plain Javascript Object with propties indicating the data in the MIDI message.

## Installation

`npm install midimessage`

## Usage

```js
var MIDIMessage = require('midimessage');

midiInput.onmidimessage = function(event){
	var midiMessage = MIDIMessage(event);
	console.log("Parsed", midiMessage);
}
```

## API

`MIDIMessage` : _Function_ - Takes a MIDIMessageEvent as the only argument and decodes the data in the MIDIMessageEvent. Returns a MIDIMessage Object which has various properties set to values based on the MIDIMessage.

These properties are based off the [MIDI Message Standard](http://www.midi.org/techspecs/midimessages.php) as defined in the [MIDI Spec](http://www.midi.org/techspecs/)

These are some of the properties that may be exposed (based on the incoming MIDI message) :

- `channel`: __Number__ (0-127) - MIDI Channel Number.
- `messageType`: __String__ - Type of message. Possible values defined below.
- `key`: __Number__ (0-127) - The key (note) number. Defined on -`noteon`,`noteoff`,`keypressure` messages.
- `velocity`: __Number__ (0-127) - Velocity. Defined on `noteon`,`noteoff` messages.
- `controllerNumber`: __Number__ (0-127) - Controller Number. Controller numbers 120-127 are reserved as "Channel Mode Messages".
- `controllerValue`: __Number__ (0-127) Controller Value. Has various meanings based on `controllerNumber`.
- `channelModeMessage`: __String__ - Channel Mode Message. Specific messages for Channel Modes based on `controllerNumber`. Possible values defined below.
- `pressure`: __Number__ (0-127) - Pressure value.
- `pitchBend`: __Number__ (0-16383) - Pitch Bend value. Center (no pitch change) is 8192.


Possible values of `messageType` property.

```js
[
'noteon', // Note On event.
'noteoff', // Note Off event.
'keypressure', // Polyphonic Key Pressure (Aftertouch).
'controlchange', // Control Change.
'programchange', // Program Change.
'channelpressure', // Channel Pressure (After-touch).
'pitchbendchange', // Pitch Bend Change.
]
```


Possible values of `channelModeMessage` property.

```js
[
'allsoundoff', // All Sound Off.
'resetallcontrollers', // Reset All Controllers.
'localcontroloff', // Local Control Off.
'localcontrolon', // Local Control On.
'allnotesoff', // All Notes Off.
'omnimodeoff', // Omni Mode Off.
'omnimodeon', // Omni Mode On.
'monomodeon', // Mono Mode On (Poly Off).
'polymodeon' // Poly Mode On (Mono Off)
]
```

# License

MIT

See License file
