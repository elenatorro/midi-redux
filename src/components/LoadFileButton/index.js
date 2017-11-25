import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style.scss';

class LoadFileButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { readMidiFile } = this.props;

    return (
      <div class="load-file-wrapper">
        <button class="load-file-button">Upload a file</button>
        <input type="file" onChange={readMidiFile} />
      </div>
    );
  }
}

export default connect()(LoadFileButton);
