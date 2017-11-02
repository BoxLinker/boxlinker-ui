import React from 'react';
import { Button } from '../../../src/index';

export default class ButtonDemo extends React.Component {
  render() {
    return (
      <div>
        <Button type="primary" size="xs">Demo Button</Button>
        &nbsp;
        <Button type="primary" size="sm">Demo Button</Button>
        &nbsp;
        <Button type="primary" loading>Loading Button</Button>
        &nbsp;
        <Button type="primary" size="lg" loading loadingIcon="加载中...">Loading Button</Button>
      </div>
    );
  }
}