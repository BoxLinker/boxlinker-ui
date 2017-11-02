import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Select, Form, FormElement } from '../../src/index';
import { GridDemo, ButtonDemo, ModalDemo } from './comps';
import './docs.less';
/* eslint-disable react/sort-comp,no-underscore-dangle,no-console,react/no-multi-comp,class-methods-use-this */

class Demo extends React.Component {
  constructor(props) {
    super(props);
    ['onSearchChange', 'onItemClick', 'loadData'].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
    this.state = {
      value: '',
      data: [],
    };
    this._sid = 0;
  }
  loadData() {
    setTimeout(() => {
      this.setState({
        data: [
          {
            label: '111',
            value: '111v',
          },
          {
            label: '222',
            value: '222v',
          },
          {
            label: '333',
            value: '333v',
          },
          {
            label: '444',
            value: '444v',
          },
        ],
      });
    }, 500);
  }
  onItemClick(item) {
    this.setState({
      value: item.value,
    });
  }
  onSearchChange(e) {
    if (this._sid > 0) {
      clearTimeout(this._sid);
    }
    this._sid = setTimeout(this.loadData, 300);
  }
  render() {
    console.log(this.state.value);
    return (
      <Select
        style={{ width: '500px' }}
        placeholder="请选择..."
        searchable
        value={this.state.value}
        labelKey="label"
        valuekey="value"
        onItemClick={this.onItemClick}
        onSearchInputChange={this.onSearchChange}
        data={this.state.data}
      />
    );
  }
}

const selectionData = [
  {
    label: '64M',
    value: 1,
  },
  {
    label: '128M',
    value: 2,
  },
  {
    label: '256M',
    value: 3,
  },
  {
    label: '512M',
    value: 4,
  },
];
class Selection extends React.Component {
  constructor(props) {
    super(props);
    ['onHardwareConfigureItemClick'].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
    this.state = {
      value: '',
      data: [],
    };
  }
  onHardwareConfigureItemClick(item) {
    this.setState({
      value: item.value,
    });
  }
  render() {
    return (
      <Select
        style={{ width: '100%' }}
        placeholder="请选择内存配置"
        value={this.state.value}
        labelKey="label"
        valuekey="value"
        onItemClick={this.onHardwareConfigureItemClick}
        data={selectionData}
      />
    );
  }
}

class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    [
      'onUsernameChange',
      'onEmailChange',
      'onSubmitError',
      'onSubmit',
    ].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
    this.state = {
      username: '',
      usernameErrMsg: '',
      email: '',
      emailErrMsg: '',
    };
  }
  onEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
    this.refEmail.validate();
  }
  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
    this.refUsername.validate();
  }
  validateUsernameRegex(v) {
    return new Promise((resolve, reject) => {
      if (v.length < 6) {
        reject('长度不够 6 位');
      } else {
        resolve(v);
      }
    });
  }
  onSubmit(data) {
    console.log(data);
  }
  onSubmitError(data) {
    console.log(data);
  }
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        onSubmitError={this.onSubmitError}
        getElements={() => [this.refUsername, this.refEmail]}
      >
        <div>
          <FormElement
            name="username"
            ref={ref => (this.refUsername = ref)}
            rules={['required', this.validateUsernameRegex]}
            onErrMsg={msg => {
              this.setState({
                usernameErrMsg: msg[1],
              });
            }}
            getValue={() => this.state.username}
          >
            <div
              className={cx(
                'form-group',
                this.state.usernameErrMsg ? 'has-error' : '',
              )}
            >
              <p className="control-label">用户名</p>
              <input
                name="username"
                className="form-control"
                value={this.state.username}
                onChange={this.onUsernameChange}
              />
              {this.state.usernameErrMsg ? (
                <p className="help-block">{this.state.usernameErrMsg}</p>
              ) : null}
            </div>
          </FormElement>
          <FormElement
            name="email"
            ref={ref => (this.refEmail = ref)}
            rules={['required', 'regexName:用户名格式不正确(字母、数字、下划线, 16 位以内)']}
            onErrMsg={err => {
              this.setState({
                emailErrMsg: err[1],
              });
            }}
            getValue={() => this.state.email}
          >
            <div
              className={cx(
                'form-group',
                this.state.emailErrMsg ? 'has-error' : '',
              )}
            >
              <p className="control-label">邮件</p>
              <input
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onEmailChange}
              />
              {this.state.emailErrMsg ? (
                <p className="help-block">{this.state.emailErrMsg}</p>
              ) : null}
            </div>
          </FormElement>
          <div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </Form>
    );
  }
}

FormDemo.propTypes = {};

ReactDOM.render(
  <div>
    <ButtonDemo />
    <hr />
    <Demo />
    <hr />
    <Selection />
    <hr />
    <FormDemo />
    <hr />
    <GridDemo />
    <hr />
    <ModalDemo />
  </div>,
  document.getElementById('app'),
);
