import React from 'react';
import { Button } from '../../../src/index';

export default class ButtonDemo extends React.Component {
  render() {
    return (
      <div>
        <Button theme="primary" size="xs">Demo Button</Button>
        &nbsp;
        <Button theme="primary" size="sm">Demo Button</Button>
        &nbsp;
        <Button theme="primary" loading>Loading Button</Button>
        &nbsp;
        <Button theme="primary" size="lg" loading loadingIcon="加载中...">Loading Button</Button>
      </div>
    );
  }
}