/**
  Events can be:
  - Meta events
  - Channel events
  - SysEx events
  - DividedSysEx events
  - Unknown
*/

export const MIDIEvents = Object.freeze({
  Meta: {
    BYTE: 0xff,
    NAME: 'meta',

    Type: {
      SequenceNumber: {
        BYTE: 0x00,
        NAME: 'sequenceNumber'
      },
      TextType: {
        BYTE: 0x01,
        NAME: 'text'
      },
      CopyrightNotice: {
        BYTE: 0x02,
        NAME: 'copyrightNotice'
      },
      TrackName: {
        BYTE: 0x03,
        NAME: 'trackName'
      },
      InstrumentName: {
        BYTE: 0x04,
        NAME: 'instrumentName'
      },
      Lyrics: {
        BYTE: 0x05,
        NAME: 'lyrics'
      },
      Marker: {
        BYTE: 0x06,
        NAME: 'marker'
      },
      CuePoint: {
        BYTE: 0x07,
        NAME: 'cuePoint'
      },
      MidiChannelPrefix: {
        BYTE: 0x20,
        NAME: 'midiChannelPrefix',
        LENGTH: 1
      },
      EndOfTrack: {
        BYTE: 0x2f,
        NAME: 'endOfTrack',
        LENGTH: 0
      },
      SetTempo: {
        BYTE: 0x51,
        NAME: 'setTempo',
        LENGTH: 3
      },
      SMPTEOffset: {
        BYTE: 0x54,
        NAME: 'smpteOffset',
        LENGTH: 5
      },
      TimeSignature: {
        BYTE: 0x58,
        NAME: 'timeSignature',
        LENGTH: 4
      },
      KeySignature: {
        BYTE: 0x59,
        NAME: 'keySignature',
        LENGTH: 2
      },
      SequencerSpecific: {
        BYTE: 0x7f,
        NAME: 'sequencerSpecific'
      }
    }
  },

  SysEx: {
    BYTE: 0xf0,
    NAME: 'sysEx'
  },
  DividedSysEx: {
    BYTE: 0xf7,
    NAME: 'dividedSysEx'
  },

  Channel: {
    BYTE: 0xf0,
    NAME: 'channel',

    Type: {
      Last: {
        BYTE: 0x80,
        NAME: 'last'
      },
      NoteOff: {
        BYTE: 0x80,
        NAME: 'noteOff'
      },
      NoteOn: {
        BYTE: 0x90,
        NAME: 'noteOn'
      },
      NoteAftertouch: {
        BYTE: 0x80,
        NAME: 'noteAftertouch'
      },
      Controller: {
        BYTE: 0x80,
        NAME: 'controller'
      },
      ProgramChange: {
        BYTE: 0x80,
        NAME: 'programChange'
      },
      ChannelAftertouch: {
        BYTE: 0x80,
        NAME: 'channelAftertouch'
      },
      PitchBend: {
        BYTE: 0x80,
        NAME: 'pitchBend'
      }
    }
  },

  Unknown: {
    NAME: 'unknown'
  }

});
