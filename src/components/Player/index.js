import React, {Component} from 'react';
import {connect} from 'react-redux';

import MusicFeedback from '../MusicFeedback';
import PlayButton from '../PlayButton';
import LoadFileButton from '../LoadFileButton';
import TrackInstruments from '../TrackInstruments';

import style from './style.scss';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      file,
      midi,
      player,
      readMidiFile,
      play
    } = this.props;

    return (
      <section class="card player">

        <header class="card-content center-align player-content">
          <PlayButton
            play={play}
          />

          <LoadFileButton
            readMidiFile={readMidiFile}
            fileName={file.fileName}
          />

          <MusicFeedback
            song={file.song}
            tempo={midi.tempo}
            fileName={file.fileName}
            readMidiFile={readMidiFile}
            isMidiPlaying={midi.isPlaying}
            isPlayerPlaying={player.isPlaying}
          />

          <p>Song: {file.fileName}</p>
        </header>

        <section class="card-action player-action">
          <TrackInstruments
            tracks={midi.tracks}
            deltaTime={midi.deltaTime}
            instruments={player.instruments}
          />
        </section>
      </section>
    );
  }
};

export default connect()(Player);
