import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style.scss';

class PlayButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { play } = this.props;

    return (
      <button
        className="btn play-button"
        onClick={play}
      />
    );
  }
};

export default connect()(PlayButton);
