import MIDIAction from '../actions/MIDIActions';
import { TimeUtils } from '../utils/TimeUtils';
import { InstrumentUtils } from '../utils/InstrumentUtils';
import { MIDIControllerTypes } from '../constants/MIDIControllers';

export function programChange(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.PROGRAM_CHANGE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function noteOn(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state, instruments, instrument, deltaTime, type, payload, tracks, velocity;

    state = getState();
    type = MIDIAction.NOTE_ON;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    instruments = state.player.instruments;
    instrument = instruments[trackIndex];
    velocity = midiMessage.velocity;

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });

      InstrumentUtils.play(
        midiMessage.noteNumber,
        instrument,
        state.midi.audioContext.currentTime,
        velocity
      );

      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function sequenceNumber(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SEQUENCE_NUMBER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function text(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.TEXT;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function trackName(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.TRACK_NAME;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function lyrics(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.LYRICS;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function marker(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.MARKER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function cuePoint(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.CUE_POINT;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function midiChannelPrefix(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.MIDI_CHANNEL_PREFIX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function endOfTrack(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.END_OF_TRACK;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function setTempo(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, tempo, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SET_TEMPO;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    tempo = TimeUtils.getBMP(midiMessage.microsecondsPerBeat, state.player.ticksPerBeat);

    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, tempo, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function smpteOffset(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SMPTE_OFFSET;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function timeSignature(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime, signature;

    state = getState();
    type = MIDIAction.TIME_SIGNATURE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    signature = midiMessage.thirtyseconds;
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, signature, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function keySignature(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.KEY_SIGNATURE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function sequencerSpecific(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SEQUENCER_SPECIFIC;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function sysEx(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.SYS_EX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function dividedSysEx(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.DIVIDED_SYS_EX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function last(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.LAST;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function noteOff(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    const STOP_DELAY_MS = 1500;
    let state, type, payload, tracks, deltaTime, instrument, instruments;

    state = getState();
    type = MIDIAction.NOTE_OFF;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };
    instruments = state.player.instruments;
    instrument = instruments[trackIndex];

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });

      if (instrument) {
        instrument.stop();
      }

      clearTimeout(timeoutId);
    }, deltaTime + STOP_DELAY_MS);
  };
}

export function noteAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.NOTE_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function channelAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.CHANNEL_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function pitchBend(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.PITCH_BEND;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function controller(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state, type, payload, tracks, deltaTime, volumes;

    state = getState();
    type = MIDIAction.CONTROLLER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    volumes = state.midi.volumes || new Array(tracks.length);

    deltaTime = (midiMessage.deltaTime !== 0) ?
      _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state) :
      midiMessage.deltaTime;

    if (midiMessage.controllerType === MIDIControllerTypes.VOLUME) {
      volumes[trackIndex] = midiMessage.value;
      payload = { tracks, trackIndex, midiMessage, volumes, deltaTime };

    } else if (midiMessage.controllerType === MIDIControllerTypes.VOLUME) {
      // TODO
    }

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function unknown(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state, type, payload, tracks, deltaTime;

    state = getState();
    type = MIDIAction.UNKNOWN;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    deltaTime = _getDeltaSeconds.call(this, midiMessage, tracks, trackIndex, state);
    payload = { tracks, trackIndex, midiMessage, deltaTime };

    var timeoutId = setTimeout(() => {
      dispatch({ type, payload });
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

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
