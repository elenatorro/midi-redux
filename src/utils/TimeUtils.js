const
  MINUTES_TO_SECONDS = 60,
  SECONDS_TO_MILLISECONDS = 1000,
  MICROSECONDS_PER_MINUTE = 60000000;

export const TimeUtils = {
  getBMP(microsecondsPerBeat) {
    return Math.round(MICROSECONDS_PER_MINUTE / microsecondsPerBeat);
  },

  getDeltaSeconds(currentDeltaTime, ticksPerBeat, tempo, signature) {
    let delta = currentDeltaTime * (SECONDS_TO_MILLISECONDS * (MINUTES_TO_SECONDS / (tempo * ticksPerBeat)));
    return delta ? delta : 0;
  }
};
