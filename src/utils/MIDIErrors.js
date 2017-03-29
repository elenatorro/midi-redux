/*jslint bitwise: true */

export const MIDIErrors = {
  checkStreamLength: function checkStreamLength(eventType, eventLength, streamLength) {
    if (eventLength !== streamLength) {
      throw 'Length Error: ' + eventType + ' expected length: ' + eventLength + ', got: ' + streamLength;
    }
	},

  unrecognisedMIDIEventType: function unrecognisedMIDIEventType(eventType) {
    throw "Unrecognised MIDI event type: " + eventType;
  },

  isValidHeaderChunk: function isValidHeaderChunk(headerChunk) {
    const
      HEADER_ID = 'MThd',
      HEADER_LENGTH = 6;

    if (headerChunk.id !== HEADER_ID || headerChunk.length !== HEADER_LENGTH) {
      throw "Bad .mid file - header not found";
    }
  },

  isValidTrackChunk: function isValidTrackChunk(trackChunk) {
    const TRACK_ID = 'MTrk';

    if (trackChunk.id !== TRACK_ID) {
      throw "Unexpected chunk - expected MTrk, got "+ trackChunk.id;
    }
  },

  isValidTimeDivision: function isValidTimeDivision(timeDivision) {
    const TIME_DIVISION_SMTPE = 0x8000;

    if (timeDivision & TIME_DIVISION_SMTPE) {
      throw "Expressing time division in SMTPE frames is not supported yet";
    }
  }
};
