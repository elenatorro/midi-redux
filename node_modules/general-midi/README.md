# General MIDI

This is a library to parse MIDI files. It is based on previous libraries, and has been modified to improve readability and to be used in a personal project that needed some changes.

**Example:**

Entry file: `sample.mid`
Output file: `sample.json`

```js
var
  fs = require('fs-extra'),
  GeneralMidi = require('./src/midi.js')
;

const
  MIDI_FILE = 'sample.mid',
  DIST_FILE = 'sample.json',
  FILE_TYPE = 'binary'
;

function readStream() {
  var midiSong = fs.readFileSync(MIDI_FILE, FILE_TYPE);
  var jsonSong = GeneralMidi.parseData(midiSong);
  fs.writeJsonSync(DIST_FILE, jsonSong);
}

readStream();
```

Example run:

```
$ node parse
```


## Next steps:
* Emoji instruments -> `src/constants.instruments-emoji`
* MIDI note numbers-strings -> `src/constants.notes-emoji`
* Use ES6

## Inspiration & Credits:
* [midi-converter](https://github.com/mobyvb/midi-converter)
* [midi-file-parser](https://github.com/NHQ/midi-file-parser)
* [midi-player-js](https://github.com/grimmdude/MidiPlayerJS)
* [soundfont-player](https://github.com/danigb/soundfont-player)


Feedback is always very welcome :)
