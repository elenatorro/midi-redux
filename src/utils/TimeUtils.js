const
  MINUTES_TO_SECONDS = 60,
  SECONDS_TO_MILLISECONDS = 1000,
  MICROSECONDS_PER_MINUTE = 60000000;

export const TimeUtils = {
  getBMP(microsecondsPerBeat, ticksPerBeat) {
    return MICROSECONDS_PER_MINUTE / microsecondsPerBeat;
  },

  getDeltaSeconds(currentDeltaTime, ticksPerBeat, tempo, signature) {
    return currentDeltaTime * (SECONDS_TO_MILLISECONDS * (MINUTES_TO_SECONDS / (tempo * ticksPerBeat)));
  }
};
