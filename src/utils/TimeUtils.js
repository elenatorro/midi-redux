const
  MINUTES_TO_SECONDS = 60,
  SECONDS_TO_MILLISECONDS = 1000
;

export const TimeUtils = {
  /*Tempo = number of ticks per minute */
  getBMP(microsecondsPerBeat, ticksPerBeat) {
    return microsecondsPerBeat / ticksPerBeat;
  },

  getDeltaSeconds(currentDeltaTime, ticksPerBeat, tempo) {
    var secondsPerBeat, secondsPerTick, timeInSeconds;

    secondsPerBeat = tempo / MINUTES_TO_SECONDS * SECONDS_TO_MILLISECONDS;
    secondsPerTick = secondsPerBeat / ticksPerBeat;
    timeInSeconds = currentDeltaTime * secondsPerTick;
    return timeInSeconds;
  },

  getGain(tempo, velocity) {
    return {
      gain: velocity / tempo
    };
  }
};
