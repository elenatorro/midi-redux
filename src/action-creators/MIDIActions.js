import MIDIAction from '../actions/MIDIActions';
import PlayerAction from '../actions/PlayerActions';
import { TimeUtils } from '../utils/TimeUtils';
import { InstrumentUtils } from '../utils/InstrumentUtils';
import { MIDIControllerTypes } from '../constants/MIDIControllers';

export function programChange(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type  = MIDIAction.PROGRAM_CHANGE;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      clearInterval(intervalId);
      dispatch({ type, payload });
    }, deltaTime);
  };
}

export function noteOn(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const isPlaying = true;
    const state = getState();
    const type = MIDIAction.NOTE_ON;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const instruments = state.player.instruments;
    const instrument = instruments[trackIndex];
    const velocity = midiMessage.velocity;
    const noteNumber = midiMessage.noteNumber;
    const channel = midiMessage.channel;
    const currentTime = state.midi.audioContext.currentTime;

    const payload = { tracks, trackIndex, midiMessage, deltaTime, isPlaying };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });

      InstrumentUtils
        .play(noteNumber, channel, instrument,  currentTime, velocity);

      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function sequenceNumber(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.SEQUENCE_NUMBER;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function text(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.TEXT;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function trackName(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.TRACK_NAME;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function lyrics(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.LYRICS;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function marker(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.MARKER;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function cuePoint(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.CUE_POINT;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);

  };
}

export function midiChannelPrefix(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.MIDI_CHANNEL_PREFIX;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function endOfTrack(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const isPlaying = false;
    const type = MIDIAction.END_OF_TRACK;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime, isPlaying };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}


export function setTempo(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.SET_TEMPO;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const tempo = TimeUtils
      .getBMP(midiMessage.microsecondsPerBeat, state.player.ticksPerBeat);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, tempo, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function smpteOffset(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.SMPTE_OFFSET;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function timeSignature(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.TIME_SIGNATURE;
    const signature = midiMessage.thirtyseconds;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, signature, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function keySignature(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.KEY_SIGNATURE;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function sequencerSpecific(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.SEQUENCER_SPECIFIC;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function sysEx(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.SYS_EX;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function dividedSysEx(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.DIVIDED_SYS_EX;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function last(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.LAST;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function noteOff(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.NOTE_OFF;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const instruments = state.player.instruments;
    const instrument = instruments[trackIndex];
    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });

      if (instrument) {
        instrument.stop();
      }

      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function noteAftertouch(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    return (dispatch, getState) => {
      const state = getState();
      const type = MIDIAction.NOTE_AFTER_TOUCH;

      const initTracks = _incrementTrackInfo
        .call(this, state.player.tracks, trackIndex, midiMessage);

      const [ deltaTime, tracks ] = _getDeltaSeconds
        .call(this, initTracks, trackIndex, state);

      const payload = { tracks, trackIndex, midiMessage, deltaTime };

      const intervalId = setInterval(() => {
        dispatch({ type, payload });
        clearInterval(intervalId);
      }, deltaTime);
    };
  };
}

export function channelAftertouch(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    return (dispatch, getState) => {
      const state = getState();
      const type = MIDIAction.AFTER_TOUCH;

      const initTracks = _incrementTrackInfo
        .call(this, state.player.tracks, trackIndex, midiMessage);

      const [ deltaTime, tracks ] = _getDeltaSeconds
        .call(this, initTracks, trackIndex, state);

      const payload = { tracks, trackIndex, midiMessage, deltaTime };

      const intervalId = setInterval(() => {
        dispatch({ type, payload });
        clearInterval(intervalId);
      }, deltaTime);
    };
  };
}

export function pitchBend(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.PITCH_BEND;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function controller(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.CONTROLLER;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = (midiMessage.deltaTime !== 0)
      ? _getDeltaSeconds.call(this, initTracks, trackIndex, state)
      : [ midiMessage.deltaTime, initTracks ];

    let volumes = state.midi.volumes || new Array(tracks.length);
    let payload = {};

    if (midiMessage.controllerType === MIDIControllerTypes.VOLUME) {
      volumes[trackIndex] = midiMessage.value;
      payload = { tracks, trackIndex, midiMessage, volumes, deltaTime };
    }

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

export function unknown(trackIndex, midiMessage, currentTrackActionIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const type = MIDIAction.UNKNOWN;

    const initTracks = _incrementTrackInfo
      .call(this, state.player.tracks, trackIndex, midiMessage);

    const [ deltaTime, tracks ] = _getDeltaSeconds
      .call(this, initTracks, trackIndex, state);

    const payload = { tracks, trackIndex, midiMessage, deltaTime };

    const intervalId = setInterval(() => {
      dispatch({ type, payload });
      clearInterval(intervalId);
    }, deltaTime);
  };
}

function _getDeltaSeconds(tracks, trackIndex, state) {
  const deltaTime = TimeUtils.getDeltaSeconds(
    tracks[trackIndex].currentDeltaTime,
    state.player.ticksPerBeat,
    state.midi.tempo,
    state.midi.signature
  );

  tracks[trackIndex].maxDeltaTime = _getMaxDeltaTime
    .call(this, deltaTime, tracks[trackIndex].maxDeltaTime);

  return [deltaTime, tracks];
}

function _incrementTrackInfo(tracks, trackIndex, midiMessage) {
  tracks[trackIndex].currentMessageIndex++;
  tracks[trackIndex].currentDeltaTime += midiMessage.deltaTime;

  return tracks;
}

function _getMaxDeltaTime(deltaTime, maxDeltaTime) {
  return maxDeltaTime > deltaTime
    ? maxDeltaTime
    : deltaTime;
}
