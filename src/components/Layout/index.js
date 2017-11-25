import React, {Component} from 'react';

import * as PlayerActions from '../../action-creators/PlayerActions';
import * as FileActions from '../../action-creators/FileActions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Player from '../Player';
import TrackInstruments from '../TrackInstruments';
import { Line } from 'rc-progress';

import style from './style.scss';

function mapStateToProps(state) {
  return { midi: state.midi, file: state.file, player: state.player };
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
  }

  render() {

    const {
      midi,
      player,
      file
    } = this.props;

    const play = this.props.playerActions.play;
    const readMidiFile = this.props.fileActions.readMidiFile;

    return (
      <section className="layout">
        <div className="layout-panel layout-panel--left">
          <svg className="layout-wave" viewBox="0 0 600 600" preserveAspectRatio="xMinYMin meet">
            <path d="M0,400 C150,500 400,300 600,300 L600,00 L0,0 Z" style={{stroke: 'none', fill:'#ff245ed6'}}></path>
          </svg>

          <h1 class="layout-title">MIDI Karaoke</h1>

          <Player
            midi={midi}
            player={player}
            file={file}
            readMidiFile={readMidiFile}
            play={play}
          />
        </div>

        <div className="container layout-panel layout-panel--right">
          <h1 class="layout-title">Instruments</h1>

          <TrackInstruments
            tracks={midi.tracks}
            deltaTime={midi.deltaTime}
            instruments={player.instruments}
          />
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
