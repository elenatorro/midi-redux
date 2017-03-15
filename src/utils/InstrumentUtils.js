const
  MAX_VELOCITY_BITS = 127;

export const InstrumentUtils = {
  play(noteNumber, instrument, currentTime, velocity) {
    if (instrument) {
      return instrument.play(noteNumber, null, {
        gain:  velocity / MAX_VELOCITY_BITS
      });
    }
  }
};
