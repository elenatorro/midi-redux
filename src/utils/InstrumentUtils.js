export const InstrumentUtils = {
  play(noteNumber, instrument, currentTime, volume) {
    if (instrument) {
      return instrument.play(noteNumber, currentTime, {gain: volume/127});
    }
  }
};
