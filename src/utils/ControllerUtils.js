import {
  MIDIControllerTypes,
  MIDIControllerChannels
} from '../constants/MIDIControllers';

export const ControllerUtils = {
  isVolume(controllerValue) {
    return controllerValue === MIDIControllerTypes.VOLUME;
  },
  isPercussion(channel) {
    return channel === MIDIControllerChannels.PERCUSSION;
  }
};
