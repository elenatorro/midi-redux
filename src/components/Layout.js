import React, { Component } from 'react';
import * as PlayerActions from '../action-creators/PlayerActions';
import * as FileActions from '../action-creators/FileActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    midi: state.midi,
    file: state.file,
    player: state.player
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playerActions: bindActionCreators(PlayerActions, dispatch),
    fileActions: bindActionCreators(FileActions, dispatch)
  };
}

class Layout extends Component {
  constructor(props) {
    super(props);
    console.log('obj', {obj: this});
    console.log('props', {props});
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
                <input type="file" onChange={this.props.fileActions.readMidiFile}/>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text"/>
              </div>
            </div>
            <button class="btn-large waves-effect waves-light purple darken-2" onClick={this.props.playerActions.play}>Play Song</button>
          </div>

          <div class="row">
            <ul>
              <li>Tempo: {this.props.midi.tempo}</li>
              <li>Delta: {this.props.midi.currentDeltaTime}</li>
              <li>Is Playing: {this.props.player.isPlaying}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
