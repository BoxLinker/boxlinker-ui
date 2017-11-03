import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    size: PropTypes.string,
    loading: PropTypes.bool,
    block: PropTypes.bool,
    children: PropTypes.any,
    loadingIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };
  static defaultProps = {
    theme: 'default',
    block: false,
    size: '',
    loadingIcon: 'Loading...',
    loading: false,
    children: 'Button',
  };
  render() {
    const { loading, loadingIcon, theme, size, block, ...props } = this.props;
    let sSize = `${size?`btn-${size}`:''}`;
    const blockCls = `${block?'btn-block':''}`;
    if (loading) {
      return <button {...props} className={`btn btn-${theme} ${sSize} ${blockCls}`} disabled>{loadingIcon}</button>
    }
    return (
      <button {...props} className={`btn btn-${theme} ${sSize} ${blockCls}`}>{this.props.children}</button>
    );
  }
}

export default Button;