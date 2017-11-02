import React from 'react';
import { Modal } from '../../../src/index';

export default class GridDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  closeModal = () => {
    console.log('closeModal');
    this.setState({
      visible: false,
    });
  };
  render() {
    const { visible } = this.state;
    return (
      <div>
        <button className="btn btn-primary" onClick={this.showModal}>
          Show Modal
        </button>
        <Modal
          visible={visible}
          footer={
            <button className="btn btn-default" onClick={this.closeModal}>
              CLOSE
            </button>
          }
        >
          <p>Modal Content ...</p>
        </Modal>
      </div>
    );
  }
}
