import GeneralMidi from 'general-midi';
import { FileAction } from '../constants/general';

function readMidiFile(file) {
	var reader;

	return (dispatch) => {
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

export var FileActions = { readMidiFile };
