import React, { Component } from 'react';
import { PlayerActions } from '../actions/PlayerActions';
import { FileActions } from '../actions/FileActions';
import { connect } from 'react-redux';

let playerActions = (dispatch) => {
	return {
		play: () => dispatch(PlayerActions.play()),
	};
};

let fileActions = (dispatch) => {
	return {
		readMidiFile: (e) => {
      dispatch(FileActions.readMidiFile(e.target.files[0]));
    },
	};
};

class Layout extends Component {
	constructor(props) {
		super(props);
		this.player = playerActions(this.props.dispatch);
    this.files = fileActions(this.props.dispatch);
	}

	render() {
		return(
      <div>
        <button onClick={this.player.play}>Play Song</button>
        <input type="file" onChange={this.files.readMidiFile}/>
      </div>
    );
	}
}

export default connect()(Layout);
