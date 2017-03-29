import React, {Component} from 'react';
import { connect } from 'react-redux';

import style from './style.scss';

class InstrumentImage extends Component {
  render() {
    const {
      instrument
    } = this.props;

    const className = `instrument instrument-${instrument} col s1`;

    return <div className={className} />
  }
}

export default connect()(InstrumentImage);
