export const TimeUtils = {
  /*Tempo*/
  getBMP(microsecondsPerBeat, ticksPerBeat) {
    return microsecondsPerBeat / ticksPerBeat;
  },

  getDeltaSeconds(currentDeltaTime, tempo) {
    return currentDeltaTime * (60.0 / tempo); // FIXME: 1000 x 60 = q4/4
  },

  getGain(tempo, velocity) {
    return {
      gain: velocity / tempo
    };
  }
};
