import React, { Component } from 'react';
import { connect } from 'react-redux';

class Instruments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { instruments } = this.props;
    return (
      <div>
        {instruments.forEach(instrument =>
          <Instrument instrument={instrument} />
        )}
      </div>
    );
  }
}

export default connect()(Instruments);
