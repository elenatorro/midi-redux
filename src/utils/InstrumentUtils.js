const MAX_VELOCITY_BITS = 127;
const RELEASE_MS = 500;

export const InstrumentUtils = {
  play(noteNumber, channel, instrument, currentTime, velocity) {
    const gain = velocity / MAX_VELOCITY_BITS;
    if (instrument) {
      _playNote(instrument, noteNumber, gain);
    }
  }
};

function _playNote (instrument, noteNumber, gain) {
  return instrument.play(noteNumber, null, {
    gain,
    release: RELEASE_MS
  });
}
