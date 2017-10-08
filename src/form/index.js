import React from 'react';
import PropTypes from 'prop-types';
import { isArray, isString, isFunction, assign } from 'lodash';

export class Form extends React.Component {
  constructor(props){
    super(props);
    ['onSubmit'].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
  }
  onSubmit(e){
    e.preventDefault();
    const eles = this.props.getElements();
    let pms = [];
    eles.forEach(ele => {
      pms.push(ele.validation());
    });
    Promise.all(pms)
      .then(
        data => {
          if (isArray(data)) {
            data = assign({}, ...data);
          }
          this.props.onSubmit(data, null);
        },
        reason => {
          this.props.onSubmit(null, reason);
        }
      );
  }
  render(){
    return (
      <form onSubmit={this.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}
Form.propTypes = {
  children: PropTypes.element.isRequired,
  getElements: PropTypes.func,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  getElements: () => { return null; },
  onSubmit: () => {},
};

const defaultRules = {
  required: (val, errMsg) => {
    return new Promise((resolve, reject) => {
      if (!val) {
        reject(errMsg);
      } else {
        resolve(val);
      }
    });
  },
  regexName: (val, errMsg) => {
    return new Promise((resolve, reject) => {
      if (/^[a-zA-Z][0-9a-zA-Z_]{6,16}$/.test(val)){
        resolve(val);
      } else {
        reject(errMsg);
      }
    });
  }
};

const DEFAULT_ERR_MSG = '输入有误';

export class FormElement extends React.Component {
  constructor(props){
    super(props);
    this._vSid = 0;
  }
  _validate(resolve, reject){
    if (this._vSid > 0) {
      clearTimeout(this._vSid);
    }
    this._vSid = setTimeout(()=>{
      let fns = [], rules = this.props.rules,  v = this.props.getValue(), name = this.props.name;
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        if (!rule) {
          continue;
        }
        if (isString(rule)) {
          let i = rule.indexOf(':');
          let name, errMsg;
          if (i <= 0) {
            name = rule;
            errMsg = DEFAULT_ERR_MSG;
          } else {
            name = rule.substring(0, i);
            errMsg = rule.substring(i+1);
          }
          if (isFunction(defaultRules[name])){
            fns.push(defaultRules[name](v, errMsg));
          }
        } else if (isFunction(rule)) {
          let p = rule(v);
          if (p && isFunction(p.then)) {
            fns.push(p);
          }
        }
      }
      if (fns.length <= 0) {
        this.props.onErrMsg([name, null]);
        resolve && resolve({ [name]: v });
        return;
      }
      Promise.all(fns)
        .then(
          value => {
            this.props.onErrMsg([name, null]);
            resolve && resolve({ [name]: isArray(value)?value[0]:value });
          },
          reason => {
            this.props.onErrMsg([name, reason]);
            reject && reject([name, reason]);
          }
        )
        .catch(e => {
          console.error('FormElement validate err: ', e);
        });
    }, 300);
  }
  validation(){
    return new Promise((resolve, reject) => {
      this._validate(resolve, reject);
    });
  }
  validate(){
    this._validate(null, null);
  }
  render(){
    return (<div>
      {this.props.children}
    </div>);
  }
}

FormElement.propTypes = {
  children: PropTypes.element.isRequired,
  getValue: PropTypes.func,
  name: PropTypes.string.isRequired,
  onErrMsg: PropTypes.func,
  rules: PropTypes.array,
};

FormElement.defaultProps = {
  rules: [],
  onErrMsg: () => {},
  getValue: () => { return null; }
};

export default Form;