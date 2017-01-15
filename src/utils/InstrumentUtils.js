export const InstrumentUtils = {
  play(noteNumber, instrument, currentTime, volume) {
    return instrument.play(noteNumber, currentTime, {gain: volume/127});
  }
};
