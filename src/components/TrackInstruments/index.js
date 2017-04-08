import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Line } from 'rc-progress';

import InstrumentImage from '../InstrumentImage';
import style from './style.scss';

class TrackInstruments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const
      strokeColor = '#ff6c4f',
      strokeWidth = '1',
      trailColor  = '0';

    const {
      tracks,
      instruments,
      deltaTime
    } = this.props;

    let track, percent;

    const tracksList = instruments.map((instrument, index) => {
      track   = tracks[index];
      percent = _getPercent(deltaTime, track.maxDeltaTime);

      return (
        <li key={index} className='row'>
          <InstrumentImage
            instrument={instrument.image}
          />
          <div className="instrument-progress col s11">
            {instrument.id}
            <Line
              percent={percent}
              strokeWidth={strokeWidth}
              trailColor={trailColor}
              strokeColor={strokeColor}/>
          </div>
        </li>
      )
    });

    return(
      <ul className='instruments'>
        {tracksList}
      </ul>
    );
  }
}

export default connect()(TrackInstruments);

const _getPercent = function(deltaTime, maxDeltaTime) {
  return deltaTime <= maxDeltaTime
    ? `${(deltaTime / maxDeltaTime) * 100}`
    : '100';
}
