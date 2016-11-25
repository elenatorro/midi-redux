/*jslint bitwise: true */

var
  MidiEvents       = require('./midi.events.js'),
  MidiStreamReader = require('./midi.streamreader.js'),
  MidiChunk        = require('./midi.chunk.js'),
  MidiErrors       = require('./midi.errors.js')
;

var MidiTracks = {
  getTracks: function parseHeader(stream, data, header) {
    var tracks, trackChunk, trackStream, i;

    tracks = [];

    for (i = 0; i < header.trackCount; i++) {
      tracks[i] = [];
      trackChunk = MidiChunk.readChunk(stream);

      MidiErrors.isValidTrackChunk(trackChunk);
      trackStream = MidiStreamReader.readStream(trackChunk.data);

      while (!trackStream.eof()) {
        tracks[i].push(MidiEvents.readEvent(trackStream));
      }
    }

    return tracks;
  }
};

module.exports = MidiTracks;
