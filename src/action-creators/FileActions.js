import GeneralMidi from 'general-midi';
import FileAction from '../actions/FileActions';

export function readMidiFile(_event) {
  return (dispatch) => {
    let reader, file;
    file = _event.target.files[0];

    reader = new FileReader();

    reader.onload = function() {
      var midi, song;

      midi = reader.result;
      song = GeneralMidi.parseData(midi);

      dispatch({ type: FileAction.LOAD_FILE, payload: { song } });
    };

    reader.readAsBinaryString(file);
  };
}
