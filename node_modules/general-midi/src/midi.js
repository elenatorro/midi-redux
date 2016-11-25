/*jslint bitwise: true */

var
  MidiStreamReader = require('./midi.streamreader.js'),
  MidiHeader       = require('./midi.header.js'),
  MidiTracks       = require('./midi.tracks.js'),
  MidiInstruments  = require('./constants.instruments.js'),
  MidiMessages     = require('./constants.messages.js')
;

var GeneralMidi = {
  parseData: function parseData(data) {
    var stream, header, tracks;

    stream = MidiStreamReader.readStream(data);
    header = MidiHeader.getHeader(stream, data);
    tracks = MidiTracks.getTracks(stream, data, header);

    return {
      header: header,
      tracks: tracks
    };
  },

  instruments: MidiInstruments,
  messages:    MidiMessages
};

module.exports = GeneralMidi;
