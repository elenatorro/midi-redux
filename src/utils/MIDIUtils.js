/*jslint bitwise: true */
import { MIDIEvents } from '../constants/MIDIEvents';

export const MIDIUtils = {
  getStreamLength: function getStreamLength(stream) {
    return stream.readVarInt();
  },

  getStreamNumber: function getStreamNumber(stream) {
    return stream.readInt16();
  },

  getStreamText: function getStreamText(stream) {
    return stream.read(stream.readVarInt());
  },

  getStreamValue: function getStreamValue(stream) {
    return stream.readInt8();
  },

  getMicrosecondsPerBeat: function getMicrosecondsPerBeat(stream) {
    return ((stream.readInt8() << 16) + (stream.readInt8() << 8) + stream.readInt8());
  },

  getSMPTEOffset: function getSMPTEOffset(stream) {
    const SMPTEOffset = Object.freeze({
      FRAME_RATE: Object.freeze({
        0x00: 24,
        0x20: 25,
        0x40: 29,
        0x60: 30
      }),
      HOUR_BYTE_FRAME_RATE: 0x60,
      HOUR_FRAME_RATE: 0x1f
    });

    let hourByte = stream.readInt8();
    stream.readInt8() & SMPTEOffset.HOUR_BYTE_FRAME_RATE;

    return {
      frameRate: SMPTEOffset.FRAME_RATE[hourByte & SMPTEOffset.HOUR_BYTE_FRAME_RATE],
      hour: hourByte & SMPTEOffset.HOUR_FRAME_RATE,
      min: stream.readInt8(),
      sec: stream.readInt8(),
      frame: stream.readInt8(),
      subframe: stream.readInt8()
    };
  },

  getTimeSignature: function getTimeSignature(stream) {
    return {
      numerator: stream.readInt8(),
      denominator: Math.pow(2, stream.readInt8()),
      metronome: stream.readInt8(),
      thirtyseconds: stream.readInt8(),
    };
  },

  getKeySignature: function getKeySignature(stream) {
    return {
      key: stream.readInt8(true),
      scale: stream.readInt8()
    };
  },

  getPitchBendValue: function getPitchBendValue(stream, numberValue) {
    return numberValue + (stream.readInt8() << 7);
  },

  getChannelEventSubtypeByte: function getChannelEventSubtypeByte(eventTypeByte) {
    return eventTypeByte >> 4;
  },

  getMetaEventSubtypeByte: function getMetaEventSubtypeByte(stream) {
    return stream.readInt8();
  },

  getChannelEventChannel: function getChannelEventChannel(eventTypeByte) {
    return eventTypeByte & 0x0f;
  },

  getEventType: function(eventTypeByte) {
    if ((eventTypeByte & 0xf0) === 0xf0) {
      if (eventTypeByte === 0xff) { return MIDIEvents.Meta.NAME; }
      if (eventTypeByte === 0xf0) { return MIDIEvents.SysEx.NAME; }
      if (eventTypeByte === 0xf7) { return MIDIEvents.DividedSysEx.NAME; }
    } else {
      return MIDIEvents.Channel.NAME;
    }
  }
};
