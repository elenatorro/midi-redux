import MIDIAction from '../actions/MIDIActions';
import { TimeUtils } from '../utils/TimeUtils';
import { InstrumentUtils } from '../utils/InstrumentUtils';
import { MIDIControllerTypes } from '../constants/MIDIControllers';

const
  STOP_DELAY_MS = 1000
;

function programChange(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    var state, type, payload, tracks, deltaTime, currentDeltaTime;

    state = getState();
    type = MIDIAction.PROGRAM_CHANGE;
    currentDeltaTime += midiMessage.deltaTime; // FIXME DECORATOR?
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => dispatch({ type, payload }), deltaTime);
  };
}

function noteOn(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    var state, instruments, instrument, deltaTime, type, payload, tracks, velocity;

    state = getState();
    type = MIDIAction.NOTE_ON;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    instruments = state.player.instruments;
    instrument = instruments[trackIndex];
    velocity = midiMessage.velocity;

    setTimeout(() => {
      dispatch({ type, payload });

      InstrumentUtils.play(
        midiMessage.noteNumber,
        instrument,
        state.midi.audioContext.currentTime,
        velocity
      );

    }, deltaTime);
  };
}

function sequenceNumber(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SEQUENCE_NUMBER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function text(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.TEXT;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function trackName(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.TRACK_NAME;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function lyrics(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.LYRICS;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function marker(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.MARKER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function cuePoint(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.CUE_POINT;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function midiChannelPrefix(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.MIDI_CHANNEL_PREFIX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function endOfTrack(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.END_OF_TRACK;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function setTempo(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, tempo, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SET_TEMPO;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    tempo = TimeUtils.getBMP(midiMessage.microsecondsPerBeat, state.player.ticksPerBeat);

    payload = { tracks, trackIndex, midiMessage, tempo };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function smpteOffset(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SMPTE_OFFSET;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function timeSignature(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime, signature;

    state = getState();
    type = MIDIAction.TIME_SIGNATURE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    signature = midiMessage.thirtyseconds;
    payload = { tracks, trackIndex, midiMessage, signature };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function keySignature(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.KEY_SIGNATURE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function sequencerSpecific(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SEQUENCER_SPECIFIC;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function sysEx(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SYS_EX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function dividedSysEx(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.DIVIDED_SYS_EX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function last(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.LAST;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function noteOff(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime, instrument, instruments;

    state = getState();
    type = MIDIAction.NOTE_OFF;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    instruments = state.player.instruments;
    instrument = instruments[trackIndex];

    setTimeout(() => {

      if (instrument) {
        instrument.stop();
      }

      dispatch({ type, payload });
    }, deltaTime + STOP_DELAY_MS);
  };
}

function noteAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.NOTE_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function channelAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.CHANNEL_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function pitchBend(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.PITCH_BEND;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function controller(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    var state, type, payload, tracks, deltaTime, volumes;

    state = getState();
    type = MIDIAction.CONTROLLER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    volumes = state.midi.volumes || new Array(tracks.length);

    if (midiMessage.controllerType === MIDIControllerTypes.VOLUME) {
      volumes[trackIndex] = midiMessage.value;
      payload = { tracks, trackIndex, midiMessage, volumes };

    } else if (midiMessage.controllerType === MIDIControllerTypes.VOLUME) {

    }

    deltaTime = (midiMessage.deltaTime !== 0) ?
      _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state) :
      midiMessage.deltaTime;

    setTimeout(() => {
      dispatch({ type, payload });
    }, deltaTime);
  };
}

function unknown(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    var state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.UNKNOWN;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    payload = { tracks, trackIndex, midiMessage };
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);

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
  controller,
  unknown
};

/* Private */

function _getDeltaSeconds(midiMessage, tracks, trackIndex, state) {
  return TimeUtils.getDeltaSeconds(
      tracks[trackIndex].currentDeltaTime,
      state.player.ticksPerBeat,
      state.midi.tempo,
      state.midi.signature
    );
}

function _incrementTrackInfo(tracks, trackIndex, midiMessage) {
  tracks[trackIndex].currentMessageIndex++;
  tracks[trackIndex].currentDeltaTime += midiMessage.deltaTime;

  return tracks;
}
