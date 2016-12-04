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
    return (
      <div class="section no-pad-bot" id="index-banner">
        <div class="container">
          <h1 class="header center purple-text">MIDI Redux</h1>
          <div class="row mg-button-group">
            <div class="file-field input-field">
              <div class="btn-large waves-effect waves-light purple darken-2">
                <span>Select MIDI file</span>
                <input type="file" onChange={this.files.readMidiFile}/>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text"/>
              </div>
            </div>
            <button class="btn-large waves-effect waves-light purple darken-2" onClick={this.player.play}>Play Song</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Layout);
