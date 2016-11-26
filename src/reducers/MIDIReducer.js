import { MIDIMessages } from '../constants/MIDIMessages';
import { DEFAULT_TEMPO_BPM } from '../constants/MIDIInstruments';

const initialState = {
  audioContext: new AudioContext(),
  currentDelta: 0,
  tempo: DEFAULT_TEMPO_BPM
};

export default function MIDIEventsReducer(state=initialState, action) {
  switch (action.type) {
      case MIDIMessages.SEQUENCE_NUMBER:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.TEXT:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.TRACK_NAME:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.PROGRAM_CHANGE:
      return {
        ...state,
        instruments: action.payload.instruments,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.INSTRUMENT_NAME:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.LYRICS:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.MARKER:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.CUE_POINT:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.MIDI_CHANNEL_PREFIX:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.END_OF_TRACK:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.SET_TEMPO:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.SMPTE_OFFSET:
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
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.KEY_SIGNATURE:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.SEQUENCER_SPECIFIC:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.SYS_EX:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.DIVIDED_SYS_EX:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.LAST:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.NOTE_OFF:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.NOTE_ON:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.NOTE_AFTER_TOUCH:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.CHANNEL_AFTER_TOUCH:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.PITCH_BEND:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    case MIDIMessages.UNKNOWN:
      return {
        ...state,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      };
    default:
      return state;
  }
}
