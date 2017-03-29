import MIDIAction from '../actions/MIDIActions';
import { TimeUtils } from '../utils/TimeUtils';
import { InstrumentUtils } from '../utils/InstrumentUtils';
import { MIDIControllerTypes } from '../constants/MIDIControllers';

export function programChange(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.PROGRAM_CHANGE;

    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);

    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function noteOn(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state,
      instruments,
      instrument,
      deltaTime,
      type,
      payload,
      tracks,
      velocity;

    const isPlaying = true;

    state = getState();
    type = MIDIAction.NOTE_ON;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);

    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime,
      isPlaying
    };

    instruments = state.player.instruments;
    instrument = instruments[trackIndex];
    velocity = midiMessage.velocity;

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});

      InstrumentUtils.play(midiMessage.noteNumber, instrument, state.midi.audioContext.currentTime, velocity);

      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function sequenceNumber(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.SEQUENCE_NUMBER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function text(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.TEXT;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function trackName(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.TRACK_NAME;

    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);

    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function lyrics(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.LYRICS;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function marker(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.MARKER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function cuePoint(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.CUE_POINT;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function midiChannelPrefix(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.MIDI_CHANNEL_PREFIX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function endOfTrack(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime,
      deltaLength;

    const isPlaying = false;

    state = getState();
    type = MIDIAction.END_OF_TRACK;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);

    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime,
      deltaLength,
      isPlaying
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function setTempo(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      tempo,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.SET_TEMPO;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    tempo = TimeUtils.getBMP(midiMessage.microsecondsPerBeat, state.player.ticksPerBeat);

    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      tempo,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function smpteOffset(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.SMPTE_OFFSET;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function timeSignature(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime,
      signature;

    state = getState();
    type = MIDIAction.TIME_SIGNATURE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    signature = midiMessage.thirtyseconds;
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      signature,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function keySignature(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.KEY_SIGNATURE;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function sequencerSpecific(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.SEQUENCER_SPECIFIC;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function sysEx(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.SYS_EX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function dividedSysEx(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.DIVIDED_SYS_EX;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function last(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.LAST;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function noteOff(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state,
      type,
      payload,
      tracks,
      deltaTime,
      instrument,
      instruments;

    state = getState();
    type = MIDIAction.NOTE_OFF;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);

    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    instruments = state.player.instruments;
    instrument = instruments[trackIndex];

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});

      if (instrument) {
        instrument.stop();
      }

      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function noteAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.NOTE_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function channelAftertouch(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.CHANNEL_AFTER_TOUCH;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function pitchBend(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.PITCH_BEND;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);
    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function controller(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state,
      type,
      payload,
      tracks,
      deltaTime,
      volumes;

    state = getState();
    type = MIDIAction.CONTROLLER;
    tracks = _incrementTrackInfo.call(this, state.player.tracks, trackIndex, midiMessage);
    volumes = state.midi.volumes || new Array(tracks.length);

    deltaTime = (midiMessage.deltaTime !== 0) ?
      _getDeltaSeconds.call(this, tracks, trackIndex, state)
      : midiMessage.deltaTime;

    if (midiMessage.controllerType === MIDIControllerTypes.VOLUME) {
      volumes[trackIndex] = midiMessage.value;
      payload = {
        tracks,
        trackIndex,
        midiMessage,
        volumes,
        deltaTime
      };
    }

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

export function unknown(trackIndex, midiMessage) {
  return (dispatch, getState) => {

    let state,
      type,
      payload,
      tracks,
      deltaTime;

    state = getState();
    type = MIDIAction.UNKNOWN;
    tracks = _incrementTrackInfo.call(
      this,
      state.player.tracks,
      trackIndex,
      midiMessage
    );

    [deltaTime, tracks] = _getDeltaSeconds.call(this, tracks, trackIndex, state);

    payload = {
      tracks,
      trackIndex,
      midiMessage,
      deltaTime
    };

    const timeoutId = setTimeout(() => {
      dispatch({type, payload});
      clearTimeout(timeoutId);
    }, deltaTime);
  };
}

function _getDeltaSeconds(tracks, trackIndex, state) {
  let deltaTime = TimeUtils.getDeltaSeconds(
    tracks[trackIndex].currentDeltaTime,
    state.player.ticksPerBeat,
    state.midi.tempo,
    state.midi.signature
  );

  tracks[trackIndex].maxDeltaTime = _getMaxDeltaTime.call(this, deltaTime, tracks[trackIndex].maxDeltaTime);

  return [deltaTime, tracks];
}

function _incrementTrackInfo(tracks, trackIndex, midiMessage) {
  tracks[trackIndex].currentMessageIndex++;
  tracks[trackIndex].currentDeltaTime += midiMessage.deltaTime;

  return tracks;
}

function _getMaxDeltaTime(deltaTime, maxDeltaTime) {
  return maxDeltaTime > deltaTime ?
    maxDeltaTime
    : deltaTime;
}
