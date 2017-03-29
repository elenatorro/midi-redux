export const MIDIChunk = {
  readChunk: function readChunk(stream) {
    const idLength = 4;
    var id, length, data;

    id = stream.read(idLength);
    length = stream.readInt32();
    data = stream.read(length);

    return {
      id: id,
      length: length,
      data: data
    };
  }
};
