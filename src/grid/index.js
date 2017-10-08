import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Grid extends React.Component {
  static propTypes = {
    columes: PropTypes.array,
  }
  render() {
    return (
      <table className="table table-hover" />
    );
  }
}