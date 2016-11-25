const idLength = 4;

var MidiChunk = {
  readChunk: function readChunk(stream) {
    var id, length;

		id     = stream.read(idLength);
		length = stream.readInt32();

		return {
			id:     id,
			length: length,
			data:   stream.read(length)
		};
	}
};

module.exports = MidiChunk;
