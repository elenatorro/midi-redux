import FileAction from '../actions/FileActions';

export function readMidiFile(_event) {
  return (dispatch) => {
    const file = _event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
      const song = reader.result;
      const fileName = file.name;

      dispatch({
        type: FileAction.LOAD_FILE,
        payload: { song, fileName }
      });
    };

    reader.readAsBinaryString(file);
  };
}
