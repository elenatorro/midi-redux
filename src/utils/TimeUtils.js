const
  MINUTES_TO_SECONDS = 60,
  SECONDS_TO_MILLISECONDS = 1000,
  VOLUME_BITS = 127,
  MICROSECONDS_PER_MINUTE = 60000000;

export const TimeUtils = {
  getBMP(microsecondsPerBeat, ticksPerBeat) {
    return MICROSECONDS_PER_MINUTE / microsecondsPerBeat;
  },

  getDeltaSeconds(currentDeltaTime, ticksPerBeat, tempo, signature) {
    return currentDeltaTime * (SECONDS_TO_MILLISECONDS * (MINUTES_TO_SECONDS / (tempo * ticksPerBeat)));
  },

  getGain(volume) {
    return {
      gain: volume / VOLUME_BITS
    };
  }
};
