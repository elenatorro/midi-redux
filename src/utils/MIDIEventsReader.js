/*jslint bitwise: true */

import { MIDIEvents } from '../constants/MIDIEvents';
import { MIDIUtils } from '../utils/MIDIUtils';
import { MIDIErrors } from '../utils/MIDIErrors';

var lastEventTypeByte;

export const MIDIEventsReader = {
  isRunningStatus: function isRunningStatus(eventTypeByte) {
    return ((eventTypeByte & 0x80) === 0);
  },

  readEvent: function readEvent(stream) {
    var event, eventType, eventTypeByte, numberValue;

    event = {};

    event.deltaTime = stream.readVarInt();
    eventTypeByte   = stream.readInt8();
    eventType       = MIDIUtils.getEventType(eventTypeByte);

    return this.read[eventType].call(this, event, eventTypeByte, numberValue, stream);
	},

  read: {
    meta: function meta(event, eventTypeByte, numberValue, stream) {
      var eventSubTypeByte;

      eventSubTypeByte = MIDIUtils.getMetaEventSubtypeByte(stream);
      event.type       = MIDIEvents.Meta.NAME;

      return this.getEvent[eventSubTypeByte] ?
        this.getEvent[eventSubTypeByte](event, stream, numberValue)
        : this.getEvent.unknownType(event, stream, numberValue);
    },

    sysEx: function sysEx(event, eventTypeByte, numberValue, stream) {
      return this.getEvent[eventTypeByte] ?
        this.getEvent[eventTypeByte](event, stream, numberValue)
        : MIDIErrors.unrecognisedMIDIEventType(eventTypeByte);
    },

    dividedSysEx: function dividedSysEx(event, eventTypeByte, numberValue, stream) {
      return this.getEvent[eventTypeByte] ?
        this.getEvent[eventTypeByte](event, stream, numberValue)
        : MIDIErrors.unrecognisedMIDIEventType(eventTypeByte);
    },

    channel: function channel(event, eventTypeByte, numberValue, stream) {
      var eventSubTypeByte;

      if (this.isRunningStatus(eventTypeByte)) {
        numberValue = eventTypeByte;
        eventTypeByte = lastEventTypeByte;
      } else {
        numberValue = stream.readInt8();
        lastEventTypeByte = eventTypeByte;
      }

      eventSubTypeByte = MIDIUtils.getChannelEventSubtypeByte(eventTypeByte);
      event.channel    = MIDIUtils.getChannelEventChannel(eventTypeByte);
      event.type       = MIDIEvents.Channel.NAME;

      return this.getEvent[eventSubTypeByte] ?
        this.getEvent[eventSubTypeByte](event, stream, numberValue)
        : MIDIErrors.unrecognisedMIDIEventType(eventSubTypeByte);
    }
  },

  getEvent: {
    0x00: function sequenceNumber(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.SequenceNumber.NAME;
      event.number  = MIDIUtils.getStreamNumber(stream);
      return event;
    },

    0x01: function text(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.TextType.NAME;
      event.text    = MIDIUtils.getStreamText(stream);
      return event;
    },

    0x02: function copyrightNotice(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.CopyrightNotice.NAME;
      event.text    = MIDIUtils.getStreamText(stream);
      return event;
    },

    0x03: function trackName(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.TrackName.NAME;
      event.text    = MIDIUtils.getStreamText(stream);
      return event;
    },

    0x04: function instrumentName(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.InstrumentName.NAME;
      event.text    = MIDIUtils.getStreamText(stream);
      return event;
    },

    0x05: function lyrics(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.Lyrics.NAME;
      event.text    = MIDIUtils.getStreamText(stream);
      return event;
    },

    0x06: function marker(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.Marker.NAME;
      event.text    = MIDIUtils.getStreamText(stream);
      return event;
    },

    0x07: function cuePoint(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.CuePoint.NAME;
      event.text    = MIDIUtils.getStreamText(stream);
      return event;
    },

    0x20: function midiChannelPrefix(event, stream) {
      MIDIErrors.checkStreamLength(
        MIDIEvents.Meta.Type.MidiChannelPrefix.NAME,
        MIDIEvents.Meta.Type.MidiChannelPrefix.LENGTH,
        MIDIUtils.getStreamLength(stream)
      );
      event.subtype = MIDIEvents.Meta.Type.MidiChannelPrefix.NAME;
      event.channel = MIDIUtils.getStreamValue(stream);
      return event;
    },

    0x2f: function endOfTrack(event, stream) {
      MIDIErrors.checkStreamLength(
        MIDIEvents.Meta.Type.EndOfTrack.NAME,
        MIDIEvents.Meta.Type.EndOfTrack.LENGTH,
        MIDIUtils.getStreamLength(stream)
      );
      event.subtype = MIDIEvents.Meta.Type.EndOfTrack.NAME;
      return event;
    },

    0x51: function setTempo(event, stream) {
      MIDIErrors.checkStreamLength(
        MIDIEvents.Meta.Type.SetTempo.NAME,
        MIDIEvents.Meta.Type.SetTempo.LENGTH,
        MIDIUtils.getStreamLength(stream)
      );
      event.subtype             = MIDIEvents.Meta.Type.SetTempo.NAME;
      event.microsecondsPerBeat = MIDIUtils.getMicrosecondsPerBeat(stream);
      return event;
    },

    0x54: function smpteOffset(event, stream) {
      var smpteOffset;

      MIDIErrors.checkStreamLength(
        MIDIEvents.Meta.Type.SMPTEOffset.NAME,
        MIDIEvents.Meta.Type.SMPTEOffset.LENGTH,
        MIDIUtils.getStreamLength(stream)
      );

      smpteOffset = MIDIUtils.getSMPTEOffset(stream);

      event.subtype   = MIDIEvents.Meta.Type.SMPTEOffset.NAME;
      event.frameRate = smpteOffset.frameRate;
      event.hour      = smpteOffset.frameRate;
      event.min       = smpteOffset.frameRate;
      event.sec       = smpteOffset.frameRate;
      event.frame     = smpteOffset.frameRate;
      event.subframe  = smpteOffset.frameRate;
      return event;
    },

    0x58: function timeSignature(event, stream) {
      var timeSignature;

      MIDIErrors.checkStreamLength(
        MIDIEvents.Meta.Type.TimeSignature.NAME,
        MIDIEvents.Meta.Type.TimeSignature.LENGTH,
        MIDIUtils.getStreamLength(stream)
      );

      timeSignature = MIDIUtils.getTimeSignature(stream);

      event.subtype       = MIDIEvents.Meta.Type.TimeSignature.NAME;
      event.numerator     = timeSignature.numerator;
      event.denominator   = timeSignature.denominator;
      event.metronome     = timeSignature.metronome;
      event.thirtyseconds = timeSignature.thirtyseconds;
      return event;
    },

    0x59: function keySignature(event, stream) {
      var keySignature;

      MIDIErrors.checkStreamLength(
        MIDIEvents.Meta.Type.KeySignature.NAME,
        MIDIEvents.Meta.Type.KeySignature.LENGTH,
        MIDIUtils.getStreamLength(stream)
      );

      keySignature = MIDIUtils.getKeySignature(stream);

      event.subtype = MIDIEvents.Meta.Type.KeySignature.NAME;
      event.key     = keySignature.key;
      event.scale   = keySignature.scale;
      return event;
    },

    0x7f: function sequencerSpecific(event, stream) {
      event.subtype = MIDIEvents.Meta.Type.SequencerSpecific.NAME;
      event.data    = MIDIUtils.getStreamText(stream);
      return event;
    },

    0xf0: function sysEx(event, stream) {
      event.type = MIDIEvents.SysEx.NAME;
      event.data = MIDIUtils.getStreamText(stream);
      return event;
    },

    0xf7: function dividedSysEx(event, stream) {
      event.type = MIDIEvents.DividedSysEx.NAME;
      event.data = MIDIUtils.getStreamText(stream);
      return event;
    },

    0x08: function noteOff(event, stream, numberValue) {
      event.subtype    = MIDIEvents.Channel.Type.NoteOff.NAME;
      event.noteNumber = numberValue;
      event.velocity   = MIDIUtils.getStreamValue(stream);
      return event;
    },

    0x09: function note(event, stream, numberValue) {
      event.noteNumber = numberValue;
      event.velocity   = MIDIUtils.getStreamValue(stream);
      event.subtype = event.velocity === 0 ?
        MIDIEvents.Channel.Type.NoteOff.NAME
        : MIDIEvents.Channel.Type.NoteOn.NAME;

      return event;
    },

    0x0a: function noteAftertouch(event, stream, numberValue) {
      event.subtype    = MIDIEvents.Channel.Type.NoteAftertouch.NAME;
      event.noteNumber = numberValue;
      event.amount     = MIDIUtils.getStreamValue(stream);
      return event;
    },

    0x0b: function controller(event, stream, numberValue) {
      event.subtype        = MIDIEvents.Channel.Type.Controller.NAME;
      event.controllerType = numberValue;
      event.value          = MIDIUtils.getStreamValue(stream);
      return event;
    },

    0x0c: function programChange(event, stream, numberValue) {
      event.subtype       = MIDIEvents.Channel.Type.ProgramChange.NAME;
      event.programNumber = numberValue;
      return event;
    },

    0x0e: function pitchBend(event, stream, numberValue) {
      event.subtype = MIDIEvents.Channel.Type.PitchBend.NAME;
      event.value = MIDIUtils.getPitchBendValue(stream, numberValue);
      return event;
    },

    0x0d: function channelAftertouch(event, stream, numberValue) {
      event.subtype = MIDIEvents.Channel.Type.ChannelAftertouch.NAME;
      event.amount = numberValue;
      return event;
    },

    unknownType: function unknownType(event, stream) {
      event.subtype = MIDIEvents.Unknown.NAME;
      event.data    = MIDIUtils.getStreamText(stream);
      return event;
    }
  }

};
