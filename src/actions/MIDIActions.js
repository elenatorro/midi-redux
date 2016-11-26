import Soundfont from 'soundfont-player';
import { MIDIInstruments, SOUNDS_PATH, SOUNDS_FILETYPE, SOUNDS_FILE_EXTENSION } from '../constants/MIDIInstruments';
import MIDIMessages from '../constants/MIDIMessages';
import { TimeUtils } from '../utils/TimeUtils';
import { InstrumentUtils } from '../utils/InstrumentUtils';

function programChange(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    var state, instruments, type, payload, tracks, deltaTime;

    state = getState();
    instruments = state.player.instruments;
    instruments[trackIndex] = MIDIInstruments[midiMessage.programNumber];
    type = MIDIMessages.PROGRAM_CHANGE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { instruments, tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => dispatch({ type, payload }), deltaTime);
  };
}

function noteOn(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    var state, deltaTime, type, payload, tracks, instrument, instrumentPath;

    state = getState();
    type = MIDIMessages.NOTE_ON;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    instrument = state.player.instruments[trackIndex];
    instrumentPath = `${SOUNDS_PATH}/${instrument}-${SOUNDS_FILETYPE}.${SOUNDS_FILE_EXTENSION}`;

    Soundfont.instrument(state.midi.audioContext, instrumentPath)
      .then((instrument) => {
        setTimeout(() => {
          dispatch({ type, payload });

          InstrumentUtils.play(
            midiMessage.noteNumber,
            midiMessage.velocity,
            instrument,
            state.midi.audioContext.currentTime,
            state.midi.tempo
          );
        }, deltaTime);
      });
  };
}

function sequenceNumber(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.SEQUENCE_NUMBER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function text(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.TEXT;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function trackName(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.TRACK_NAME;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function lyrics(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.LYRICS;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function marker(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.MARKER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function cuePoint(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.CUE_POINT;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function midiChannelPrefix(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.MIDI_CHANNEL_PREFIX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function endOfTrack(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.END_OF_TRACK;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function setTempo(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, tempo, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.SET_TEMPO;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    tempo = TimeUtils.getBMP(midiMessage.microsecondsPerBeat, state.player.ticksPerBeat);
    payload = { tracks, trackIndex, midiMessage, tempo };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function smpteOffset(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.SMPTE_OFFSET;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function timeSignature(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.TIME_SIGNATURE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function keySignature(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.KEY_SIGNATURE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function sequencerSpecific(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.SEQUENCER_SPECIFIC;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function sysEx(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.SYS_EX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function dividedSysEx(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.DIVIDED_SYS_EX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function last(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.LAST;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function noteOff(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.NOTE_OFF;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function noteAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.NOTE_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function noteAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.NOTE_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function channelAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.CHANNEL_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function pitchBend(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.PITCH_BEND;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function unknown(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIMessages.UNKNOWN;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

export const MIDIActions = {
  sequenceNumber,
  text,
  trackName,
  lyrics,
  programChange,
  noteOn,
  marker,
  cuePoint,
  midiChannelPrefix,
  endOfTrack,
  setTempo,
  smpteOffset,
  timeSignature,
  keySignature,
  sequencerSpecific,
  sysEx,
  dividedSysEx,
  last,
  noteOff,
  noteAftertouch,
  channelAftertouch,
  pitchBend,
  unknown
};

/* Private */

function _getDeltaSeconds(tracks, trackIndex, state) {
  return TimeUtils.getDeltaSeconds(
    tracks[trackIndex].currentDeltaTime,
    state.midi.tempo
  );
}

function _incrementTrackInfo(tracks, trackIndex, midiMessage) {
  tracks[trackIndex].currentMessageIndex++;
  tracks[trackIndex].currentDeltaTime += midiMessage.deltaTime;

  return tracks;
}
