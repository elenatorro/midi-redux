import { PERCUSSION_CHANNEL, PERCUSSION_VOLUME } from '../constants/MIDIPercussion';

const MAX_VELOCITY_BITS = 127;
const RELEASE_MS = 500;

export const InstrumentUtils = {
  play(noteNumber, channel, instrument, currentTime, velocity) {
    const gain = velocity / MAX_VELOCITY_BITS;
    if (instrument) {
      if (channel === PERCUSSION_CHANNEL) {
        _playPercussion(instrument, gain);
      } else {
        _playNote(instrument, noteNumber, gain);
      }
    }
  }
};

function _playNote (instrument, noteNumber, gain) {
  return instrument.play(noteNumber, null, {
    gain,
    release: RELEASE_MS
  });
}

function _playPercussion (instrument, gain) {
  // TODO fix gain value, use instead of constant
  instrument.volume(PERCUSSION_VOLUME);
  instrument.play();
}
