/*jslint bitwise: true */

var
  Events     = require('./constants.events.js'),
  Utils      = require('./utils.js'),
  MidiErrors = require('./midi.errors.js')
;

var lastEventTypeByte;
var MidiEvents = {
  isRunningStatus: function isRunningStatus(eventTypeByte) {
    return ((eventTypeByte & 0x80) === 0);
  },

  readEvent: function readEvent(stream) {
    var event, eventType, eventTypeByte, numberValue;

    event = {};

    event.deltaTime = stream.readVarInt();
    eventTypeByte   = stream.readInt8();
    eventType       = Utils.getEventType(eventTypeByte);

    return this.read[eventType].call(this, event, eventTypeByte, numberValue, stream);
	},

  read: {
    meta: function meta(event, eventTypeByte, numberValue, stream) {
      var eventSubTypeByte;

      eventSubTypeByte = Utils.getMetaEventSubtypeByte(stream);
      event.type       = Events.Meta.NAME;

      return this.getEvent[eventSubTypeByte] ?
        this.getEvent[eventSubTypeByte](event, stream, numberValue)
        : this.getEvent.unknownType(event, stream, numberValue);
    },

    sysEx: function sysEx(event, eventTypeByte, numberValue, stream) {
      return this.getEvent[eventTypeByte] ?
        this.getEvent[eventTypeByte](event, stream, numberValue)
        : MidiErrors.unrecognisedMIDIEventType(eventTypeByte);
    },

    dividedSysEx: function dividedSysEx(event, eventTypeByte, numberValue, stream) {
      return this.getEvent[eventTypeByte] ?
        this.getEvent[eventTypeByte](event, stream, numberValue)
        : MidiErrors.unrecognisedMIDIEventType(eventTypeByte);
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

      eventSubTypeByte = Utils.getChannelEventSubtypeByte(eventTypeByte);
      event.channel    = Utils.getChannelEventChannel(eventTypeByte);
      event.type       = Events.Channel.NAME;

      return this.getEvent[eventSubTypeByte] ?
        this.getEvent[eventSubTypeByte](event, stream, numberValue)
        : MidiErrors.unrecognisedMIDIEventType(eventSubTypeByte);
    }
  },

  getEvent: {
    0x00: function sequenceNumber(event, stream) {
      MidiErrors.checkStreamLength(
        Events.Meta.Type.SequenceNumber.NAME,
        Events.Meta.Type.SequenceNumber.LENGTH,
        Utils.getStreamLength(stream)
      );
      event.subtype = Events.Meta.Type.SequenceNumber.NAME;
      event.number  = Utils.getStreamNumber(stream);
      return event;
    },

    0x01: function text(event, stream) {
      event.subtype = Events.Meta.Type.TextType.NAME;
      event.text    = Utils.getStreamText(stream);
      return event;
    },

    0x02: function copyrightNotice(event, stream) {
      event.subtype = Events.Meta.Type.CopyrightNotice.NAME;
      event.text    = Utils.getStreamText(stream);
      return event;
    },

    0x03: function trackName(event, stream) {
      event.subtype = Events.Meta.Type.TrackName.NAME;
      event.text    = Utils.getStreamText(stream);
      return event;
    },

    0x04: function instrumentName(event, stream) {
      event.subtype = Events.Meta.Type.InstrumentName.NAME;
      event.text    = Utils.getStreamText(stream);
      return event;
    },

    0x05: function lyrics(event, stream) {
      event.subtype = Events.Meta.Type.Lyrics.NAME;
      event.text    = Utils.getStreamText(stream);
      return event;
    },

    0x06: function marker(event, stream) {
      event.subtype = Events.Meta.Type.Marker.NAME;
      event.text    = Utils.getStreamText(stream);
      return event;
    },

    0x07: function cuePoint(event, stream) {
      event.subtype = Events.Meta.Type.CuePoint.NAME;
      event.text    = Utils.getStreamText(stream);
      return event;
    },

    0x20: function midiChannelPrefix(event, stream) {
      MidiErrors.checkStreamLength(
        Events.Meta.Type.MidiChannelPrefix.NAME,
        Events.Meta.Type.MidiChannelPrefix.LENGTH,
        Utils.getStreamLength(stream)
      );
      event.subtype = Events.Meta.Type.MidiChannelPrefix.NAME;
      event.channel = Utils.getStreamValue(stream);
      return event;
    },

    0x2f: function endOfTrack(event, stream) {
      MidiErrors.checkStreamLength(
        Events.Meta.Type.EndOfTrack.NAME,
        Events.Meta.Type.EndOfTrack.LENGTH,
        Utils.getStreamLength(stream)
      );
      event.subtype = Events.Meta.Type.EndOfTrack.NAME;
      return event;
    },

    0x51: function setTempo(event, stream) {
      MidiErrors.checkStreamLength(
        Events.Meta.Type.SetTempo.NAME,
        Events.Meta.Type.SetTempo.LENGTH,
        Utils.getStreamLength(stream)
      );
      event.subtype             = Events.Meta.Type.SetTempo.NAME;
      event.microsecondsPerBeat = Utils.getMicrosecondsPerBeat(stream);
      return event;
    },

    0x54: function smpteOffset(event, stream) {
      var smpteOffset;

      MidiErrors.checkStreamLength(
        Events.Meta.Type.SMTPOffset.NAME,
        Events.Meta.Type.SMTPOffset.LENGTH,
        Utils.getStreamLength(stream)
      );

      smpteOffset = Utils.getSMPTEOffset(stream);

      event.subtype   = Events.Meta.Type.SMTPOffset.NAME;
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

      MidiErrors.checkStreamLength(
        Events.Meta.Type.TimeSignature.NAME,
        Events.Meta.Type.TimeSignature.LENGTH,
        Utils.getStreamLength(stream)
      );

      timeSignature = Utils.getTimeSignature(stream);

      event.subtype       = Events.Meta.Type.TimeSignature.NAME;
      event.numerator     = timeSignature.numerator;
      event.denominator   = timeSignature.denominator;
      event.metronome     = timeSignature.metronome;
      event.thirtyseconds = timeSignature.thirtyseconds;
      return event;
    },

    0x59: function keySignature(event, stream) {
      var keySignature;

      MidiErrors.checkStreamLength(
        Events.Meta.Type.KeySignature.NAME,
        Events.Meta.Type.KeySignature.LENGTH,
        Utils.getStreamLength(stream)
      );

      keySignature = Utils.getKeySignature(stream);

      event.subtype = Events.Meta.Type.KeySignature.NAME;
      event.key     = keySignature.key;
      event.scale   = keySignature.scale;
      return event;
    },

    0x7f: function sequencerSpecific(event, stream) {
      event.subtype = Events.Meta.Type.SequencerSpecific.NAME;
      event.data    = Utils.getStreamText(stream);
      return event;
    },

    0xf0: function sysEx(event, stream) {
      event.type = Events.System.SysEx.NAME;
      event.data = Utils.getStreamText(stream);
      return event;
    },

    0xf7: function dividedSysEx(event, stream) {
      event.type = Events.System.DividedSysEx.NAME;
      event.data = Utils.getStreamText(stream);
      return event;
    },

    0x08: function noteOff(event, stream, numberValue) {
      event.subtype    = Events.Channel.Type.NoteOff.NAME;
      event.noteNumber = numberValue;
      event.velocity   = Utils.getStreamValue(stream);
      return event;
    },

    0x09: function note(event, stream, numberValue) {
      event.noteNumber = numberValue;
      event.velocity   = Utils.getStreamValue(stream);
      event.subtype = event.velocity === 0 ?
        Events.Channel.Type.NoteOff.NAME
        : Events.Channel.Type.NoteOn.NAME;

      return event;
    },

    0x0a: function noteAftertouch(event, stream, numberValue) {
      event.subtype    = Events.Channel.Type.NoteAftertouch.NAME;
      event.noteNumber = numberValue;
      event.amount     = Utils.getStreamValue(stream);
      return event;
    },

    0x0b: function controller(event, stream, numberValue) {
      event.subtype        = Events.Channel.Type.Controller.NAME;
      event.controllerType = numberValue;
      event.value          = Utils.getStreamValue(stream);
      return event;
    },

    0x0c: function programChange(event, stream, numberValue) {
      event.subtype       = Events.Channel.Type.ProgramChange.NAME;
      event.programNumber = numberValue;
      return event;
    },

    0x0e: function pitchBend(event, stream, numberValue) {
      event.subtype = Events.Channel.Type.PitchBend.NAME;
      event.value = Utils.getPitchBendValue(stream, numberValue);
      return event;
    },

    0x0d: function channelAftertouch(event, stream, numberValue) {
      event.subtype = Events.Channel.Type.ChannelAftertouch.NAME;
      event.amount = numberValue;
      return event;
    },

    unknownType: function unknownType(event, stream) {
      event.subtype = Events.Unknown.NAME;
      event.data    = Utils.getStreamText(stream);
      return event;
    }
  }

};

module.exports = MidiEvents;
