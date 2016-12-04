import MIDIMessages from '../constants/MIDIMessages';
import { DEFAULT_TEMPO_BPM, DEFAULT_SIGNATURE } from '../constants/MIDIInstruments';

const initialState = {
  audioContext: new AudioContext(),
  currentDelta: 0,
  tempo: DEFAULT_TEMPO_BPM,
  signature: DEFAULT_SIGNATURE
};

export default function MIDIEventsReducer(state = initialState, action) {
  switch (action.type) {
    case MIDIMessages.PROGRAM_CHANGE:
    case MIDIMessages.SEQUENCE_NUMBER:
    case MIDIMessages.TEXT:
    case MIDIMessages.TRACK_NAME:
    case MIDIMessages.INSTRUMENT_NAME:
    case MIDIMessages.LYRICS:
    case MIDIMessages.MARKER:
    case MIDIMessages.CUE_POINT:
    case MIDIMessages.MIDI_CHANNEL_PREFIX:
    case MIDIMessages.END_OF_TRACK:
    case MIDIMessages.SET_TEMPO:
    case MIDIMessages.SMPTE_OFFSET:
    case MIDIMessages.KEY_SIGNATURE:
    case MIDIMessages.SEQUENCER_SPECIFIC:
    case MIDIMessages.SYS_EX:
    case MIDIMessages.DIVIDED_SYS_EX:
    case MIDIMessages.LAST:
    case MIDIMessages.NOTE_OFF:
    case MIDIMessages.NOTE_ON:
    case MIDIMessages.NOTE_AFTER_TOUCH:
    case MIDIMessages.CHANNEL_AFTER_TOUCH:
    case MIDIMessages.PITCH_BEND:
    case MIDIMessages.UNKNOWN:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.TIME_SIGNATURE:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage,
        signature: action.payload.signature
      }
    default:
      return state;
  }
}
