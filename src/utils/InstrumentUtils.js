import { TimeUtils } from '../utils/TimeUtils';

export const InstrumentUtils = {
	play(noteNumber, velocity, instrument, currentTime, tempo) {
		return instrument.play(noteNumber, currentTime, TimeUtils.getGain(tempo, velocity));
	}
};
