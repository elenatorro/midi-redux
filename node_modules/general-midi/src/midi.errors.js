/*jslint bitwise: true */

const
  HEADER_ID           = 'MThd',
  TRACK_ID            = 'MTrk',
  HEADER_LENGTH       = 6,
  TIME_DIVISION_SMTPE = 0x8000
;

var MidiErrors = {
  checkStreamLength: function checkStreamLength(eventType, eventLength, streamLength) {
    if (eventLength !== streamLength) {
      throw 'Length Error: ' + eventType + ' expected length: ' + eventLength + ', got: ' + streamLength;
    }
	},

  unrecognisedMIDIEventType: function unrecognisedMIDIEventType(eventType) {
    throw "Unrecognised MIDI event type: " + eventType;
  },

  isValidHeaderChunk: function isValidHeaderChunk(headerChunk) {
    if (headerChunk.id !== HEADER_ID || headerChunk.length !== HEADER_LENGTH) {
      throw "Bad .mid file - header not found";
    }
  },

  isValidTrackChunk: function isValidTrackChunk(trackChunk) {
    if (trackChunk.id !== TRACK_ID) {
      throw "Unexpected chunk - expected MTrk, got "+ trackChunk.id;
    }
  },

  isValidTimeDivision: function isValidTimeDivision(timeDivision) {
    if (timeDivision & TIME_DIVISION_SMTPE) {
      throw "Expressing time division in SMTPE frames is not supported yet";
    }
  }
};

module.exports = MidiErrors;
