const
  MAX_VELOCITY_BITS = 127,
  DECAY_MS = 500;

export const InstrumentUtils = {
  play(noteNumber, instrument, currentTime, velocity) {
    if (instrument) {
      return instrument.play(noteNumber, currentTime, {
        gain:  velocity / MAX_VELOCITY_BITS,
        decay: DECAY_MS
      });
    }
  }
};
