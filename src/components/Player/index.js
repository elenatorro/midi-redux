import React, {Component} from 'react';
import {connect} from 'react-redux';

import PlayButton from '../PlayButton';
import MusicFeedback from '../MusicFeedback';
import LoadFileButton from '../LoadFileButton';

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

    const SongName = !file.song
      ? ""
      : <section>
        <p>Song</p>
        <p class="player-songname">{file.fileName}</p>
      </section>;

    return (
      <section class="player">

        <header class="player-header">
          <PlayButton
            play={play}
          />

          <LoadFileButton
            readMidiFile={readMidiFile}
            fileName={file.fileName}
          />
        </header>

        <section class="card-action player-action">

          <MusicFeedback
            song={file.song}
            tempo={midi.tempo}
            fileName={file.fileName}
            readMidiFile={readMidiFile}
            isMidiPlaying={midi.isPlaying}
            isPlayerPlaying={player.isPlaying}
          />

          {SongName}

        </section>
      </section>
    );
  }
};

export default connect()(Player);
