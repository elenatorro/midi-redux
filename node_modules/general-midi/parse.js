var
  fs = require('fs-extra'),
  GeneralMidi = require('./src/midi.js')
;

const
  MIDI_FILE = 'StarWars.mid',
  DIST_FILE = 'sample.json',
  FILE_TYPE = 'binary'
;

function readStream() {
  var midiSong = fs.readFileSync(MIDI_FILE, FILE_TYPE);
  var jsonSong = GeneralMidi.parseData(midiSong);
  fs.writeJsonSync(DIST_FILE, jsonSong);
}

readStream();
