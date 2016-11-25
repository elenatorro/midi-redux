/*jslint bitwise: true */

var
  MidiStreamReader = require('./midi.streamreader.js'),
  MidiChunk        = require('./midi.chunk.js'),
  MidiErrors       = require('./midi.errors.js')
;

var MidiHeader = {
  getHeader: function parseHeader(stream, data) {
    var headerChunk, headerStream, formatType, trackCount, timeDivision, ticksPerBeat;

    headerChunk = MidiChunk.readChunk(stream);
    MidiErrors.isValidHeaderChunk(headerChunk);

    headerStream = MidiStreamReader.readStream(headerChunk.data);
    formatType   = headerStream.readInt16();
    trackCount   = headerStream.readInt16();
    timeDivision = headerStream.readInt16();

    MidiErrors.isValidTimeDivision(timeDivision);
    ticksPerBeat = timeDivision;

    return {
      formatType: formatType,
      trackCount: trackCount,
      ticksPerBeat: ticksPerBeat
    };
  }
};

module.exports = MidiHeader;
