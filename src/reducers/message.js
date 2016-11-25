import { MIDIInstruments, DEFAULT_TEMPO_BPM } from '../constants/MIDIInstruments';
import { MIDIMessages } from '../constants/MIDIMessages';
import { Player } from '../constants/general';
import { FileAction } from '../constants/general';

const initialState = {
  audioContext: new AudioContext(),
  currentDelta: 0,
  instruments: null,
  programChange: MIDIInstruments[0],
  song: null,
  tempo: DEFAULT_TEMPO_BPM,
  ticksPerBeat: null,
  trackName: '',
  tracks: null
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case FileAction.LOAD_FILE:
      return Object.assign({}, state, {
        song: action.payload.song,
        ticksPerBeat: action.payload.song.header.ticksPerBeat
      });
    case Player.PLAY:
      return Object.assign({}, state, {
        instruments: action.payload.instruments,
        tracks: action.payload.tracks,
        isPlaying: true
      });
    case MIDIMessages.SEQUENCE_NUMBER:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.TEXT:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.TRACK_NAME:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.PROGRAM_CHANGE:
      return Object.assign({}, state, {
        instruments: action.payload.instruments,
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.INSTRUMENT_NAME:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.LYRICS:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.MARKER:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.CUE_POINT:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.MIDI_CHANNEL_PREFIX:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.END_OF_TRACK:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.SET_TEMPO:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.SMPTE_OFFSET:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.TIME_SIGNATURE:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.KEY_SIGNATURE:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.SEQUENCER_SPECIFIC:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.SYS_EX:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.DIVIDED_SYS_EX:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.LAST:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.NOTE_OFF:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.NOTE_ON:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.NOTE_AFTER_TOUCH:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.CHANNEL_AFTER_TOUCH:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.PITCH_BEND:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    case MIDIMessages.UNKNOWN:
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        trackIndex: action.payload.trackIndex,
        midiMessage: action.payload.midiMessage
      });
    default:
      return state;
  }
}
