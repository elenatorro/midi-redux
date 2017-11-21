import MIDIAction from '../actions/MIDIActions';
import { DEFAULT_TEMPO_BPM, DEFAULT_SIGNATURE } from '../constants/MIDIInstruments';

const initialState = {
  tempo: DEFAULT_TEMPO_BPM,
  tracks: [],
  deltaTime: 0,
  signature: DEFAULT_SIGNATURE,
  isPlaying: false,
  audioContext: new AudioContext()
};

export default function MIDIEventsReducer(state=initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MIDIAction.SET_TEMPO:
    case MIDIAction.TIME_SIGNATURE:
    case MIDIAction.NOTE_ON:
    case MIDIAction.NOTE_OFF:
    case MIDIAction.END_OF_TRACK:
    case MIDIAction.PROGRAM_CHANGE:
    case MIDIAction.SEQUENCE_NUMBER:
    case MIDIAction.TEXT:
    case MIDIAction.TRACK_NAME:
    case MIDIAction.INSTRUMENT_NAME:
    case MIDIAction.LYRICS:
    case MIDIAction.MARKER:
    case MIDIAction.CUE_POINT:
    case MIDIAction.MIDI_CHANNEL_PREFIX:
    case MIDIAction.SMPTE_OFFSET:
    case MIDIAction.KEY_SIGNATURE:
    case MIDIAction.SEQUENCER_SPECIFIC:
    case MIDIAction.SYS_EX:
    case MIDIAction.DIVIDED_SYS_EX:
    case MIDIAction.LAST:
    case MIDIAction.NOTE_AFTER_TOUCH:
    case MIDIAction.CHANNEL_AFTER_TOUCH:
    case MIDIAction.PITCH_BEND:
    case MIDIAction.UNKNOWN:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
