/*jslint bitwise: true */

var Events = require('./constants.events.js');

var SMPTEOffset = {
  frameRate: {
    0x00: 24,
    0x20: 25,
    0x40: 29,
    0x60: 30
  },
  hourByteFrameRate: 0x60,
  hourFrameRate: 0x1f
};

var Utils = {
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
    var hourByte = stream.readInt8();
    stream.readInt8() & SMPTEOffset.hourByteFrameRate;
    return {
      frameRate: SMPTEOffset.frameRate[hourByte & SMPTEOffset.hourByteFrameRate],
      hour:      hourByte & SMPTEOffset.hourFrameRate,
      min:       stream.readInt8(),
      sec:       stream.readInt8(),
      frame:     stream.readInt8(),
      subframe:  stream.readInt8()
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
      key:   stream.readInt8(true),
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
      if (eventTypeByte === 0xff) {return Events.Meta.NAME;}
      if (eventTypeByte === 0xf0) {return Events.SysEx.NAME;}
      if (eventTypeByte === 0xf7) {return Events.DividedSysEx.NAME;}
    } else {
      return Events.Channel.NAME;
    }
  }
};

module.exports = Utils;
