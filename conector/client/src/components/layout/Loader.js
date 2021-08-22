import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Loader = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="loading gif"
    />
  </Fragment>
);

export default Loader;
