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
      <div className="file-field input-field load-file">
        <input type="file" onChange={readMidiFile}/>
        <button className="btn load-file-button">

        </button>
      </div>
    );
  }
};

export default connect()(LoadFileButton);
