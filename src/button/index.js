import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    loadingIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onClick: PropTypes.func,
  };
  static defaultProps = {
    type: 'primary',
    size: '',
    loadingIcon: 'Loading...',
    loading: false,
    children: 'Button',
    onClick: () => {},
  };
  render() {
    const { loading, loadingIcon, type, size } = this.props;
    let sSize = `${size?`btn-${size}`:''}`;
    if (loading) {
      return <button className={`btn btn-${type} ${sSize}`} disabled>{loadingIcon}</button>
    }
    return (
      <button className={`btn btn-${type} ${sSize}`} onClick={this.props.onClick}>{this.props.children}</button>
    );
  }
}

export default Button;