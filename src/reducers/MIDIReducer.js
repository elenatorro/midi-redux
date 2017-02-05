import MIDIAction from '../actions/MIDIActions';
import { DEFAULT_TEMPO_BPM, DEFAULT_SIGNATURE } from '../constants/MIDIInstruments';

const initialState = {
  audioContext: new AudioContext(),
  currentDeltaTime: 0,
  tempo: DEFAULT_TEMPO_BPM,
  signature: DEFAULT_SIGNATURE
};

export default function MIDIEventsReducer(state = initialState, action) {
  switch (action.type) {
    case MIDIAction.SET_TEMPO:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage,
        tempo: action.payload.tempo,
        currentDeltaTime: action.payload.currentDeltaTime
      };
    case MIDIAction.TIME_SIGNATURE:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage,
        signature: action.payload.signature,
        currentDeltaTime: action.payload.currentDeltaTime
      };
    case MIDIAction.PROGRAM_CHANGE:
    case MIDIAction.SEQUENCE_NUMBER:
    case MIDIAction.TEXT:
    case MIDIAction.TRACK_NAME:
    case MIDIAction.INSTRUMENT_NAME:
    case MIDIAction.LYRICS:
    case MIDIAction.MARKER:
    case MIDIAction.CUE_POINT:
    case MIDIAction.MIDI_CHANNEL_PREFIX:
    case MIDIAction.END_OF_TRACK:
    case MIDIAction.SMPTE_OFFSET:
    case MIDIAction.KEY_SIGNATURE:
    case MIDIAction.SEQUENCER_SPECIFIC:
    case MIDIAction.SYS_EX:
    case MIDIAction.DIVIDED_SYS_EX:
    case MIDIAction.LAST:
    case MIDIAction.NOTE_OFF:
    case MIDIAction.NOTE_ON:
    case MIDIAction.NOTE_AFTER_TOUCH:
    case MIDIAction.CHANNEL_AFTER_TOUCH:
    case MIDIAction.PITCH_BEND:
    case MIDIAction.UNKNOWN:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage,
        currentDeltaTime: action.payload.currentDeltaTime
      };
    default:
      return state;
  }
}
