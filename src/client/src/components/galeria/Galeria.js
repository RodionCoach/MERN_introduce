import React, { Component } from 'react';

import Info from './Info';
import Service from './services/Service';
import

class Home extends Component {
  render() {
    return (
      <div>
        <Info />
        <Service />
      </div>
    );
  }
}

export default Home;
