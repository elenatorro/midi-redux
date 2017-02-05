import React, { Component } from 'react';
import { connect } from 'react-redux';

class Instrument extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { instrument } = this.props;
    return ({ // TODO
      <div>{instrument}</div>
    );
  }
}

export default connect()(Instrument);
