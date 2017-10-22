import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export default class extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    footer: PropTypes.element,
  };
  static defaultProps = {
    children: null,
    visible: false,
    footer: null,
    onCancel: () => {},
  };
  getFooter() {
    const { footer, onCancel } = this.props;
    if (!footer) {
      return <Button onClick={onCancel}>关闭</Button>;
    }
    return footer;
  }
  render() {
    const { visible } = this.props;
    return (
      <Modal show={visible} onHide={this.props.onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>{this.getFooter()}</Modal.Footer>
      </Modal>
    );
  }
}
