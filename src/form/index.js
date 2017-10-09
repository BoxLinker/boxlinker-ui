import React from 'react';
import PropTypes from 'prop-types';
import { isArray, assign } from 'lodash';
import FormElement from './element';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    ['onSubmit'].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const eles = this.props.getElements();
    const pms = [];
    eles.forEach(ele => {
      pms.push(ele.validation());
    });
    Promise.all(pms).then(
      data => {
        let results = {};
        if (isArray(data)) {
          results = assign({}, ...data);
        }
        this.props.onSubmit(results, null);
      },
      reason => {
        this.props.onSubmit(null, reason);
      },
    );
  }
  render() {
    return <form onSubmit={this.onSubmit}>{this.props.children}</form>;
  }
}
Form.propTypes = {
  children: PropTypes.element.isRequired,
  getElements: PropTypes.func,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  getElements: () => null,
  onSubmit: () => {},
};

export { FormElement };

export default Form;
