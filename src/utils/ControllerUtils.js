// TODO add percussion (channel 10)
// https://en.wikipedia.org/wiki/General_MIDI#Percussion
import { MIDIControllerTypes } from '../constants/MIDIControllers';

export const ControllerUtils = {
  isVolume(controllerValue) {
    return controllerValue === MIDIControllerTypes.VOLUME;
  }
};
