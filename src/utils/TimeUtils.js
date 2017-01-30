const
  MINUTES_TO_SECONDS = 60,
  SECONDS_TO_MILLISECONDS = 1000,
  VOLUME_BITS = 127;

export const TimeUtils = {
  /* Tempo = number of ticks per minute */
  getBMP(microsecondsPerBeat, ticksPerBeat) {
    return microsecondsPerBeat / ticksPerBeat;
  },

  getDeltaSeconds(currentDeltaTime, ticksPerBeat, tempo, signature) {    
    var secondsPerBeat, secondsPerTick, timeInSeconds;

    secondsPerBeat = tempo / MINUTES_TO_SECONDS * SECONDS_TO_MILLISECONDS;
    secondsPerTick = secondsPerBeat / ticksPerBeat;
    timeInSeconds  = currentDeltaTime * secondsPerTick;

    return timeInSeconds / signature;
  },

  getGain(volume) {
    return {
      gain: volume / VOLUME_BITS
    };
  }
};
