var MidiMessages = Object.freeze({
  SEQUENCE_NUMBER:     'sequenceNumber',
  TEXT:                'text',
  TRACK_NAME:          'trackName',
  INSTRUMENT_NAME:     'instrumentName',
  PROGRAM_CHANGE:      'programChange',
  LYRICS:              'lyrics',
  MARKER:              'marker',
  CUE_POINT:           'cuePoint',
  MIDI_CHANNEL_PREFIX: 'midiChannelPrefix',
  END_OF_TRACK:        'endOfTrack',
  SET_TEMPO:           'setTempo',
  SMPTE_OFFSET:        'smpteOffset',
  TIME_SIGNATURE:      'timeSignature',
  KEY_SIGNATURE:       'keySignature',
  SEQUENCER_SPECIFIC:  'sequencerSpecific',
  SYS_EX:              'sysEx',
  DIVIDED_SYS_EX:      'dividedSysEx',
  LAST:                'last',
  NOTE_OFF:            'noteOff',
  NOTE_ON:             'noteOn',
  NOTE_AFTER_TOUCH:    'noteAftertouch',
  CHANNEL_AFTER_TOUCH: 'channelAftertouch',
  PITCH_BEND:          'pitchBend',
  UNKNOWN:             'unknown'
});

module.exports = MidiMessages;
