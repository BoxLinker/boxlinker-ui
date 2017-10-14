import React from 'react';
import { Grid } from '../../../src/index';

const columns = [
  {
    field: 'name',
    label: '名称',
  },
  {
    field: 'image',
    label: '镜像',
  },
  {
    field: 'configure',
    label: '配置',
    render(v, item) {
      return <div>{`cpu:${item.cpu} 内存:${item.memory}`}</div>;
    },
  },
  {
    field: 'ports',
    label: '端口',
    render(ports) {
      if (!ports || !ports.length) {
        return <span>&nbsp;</span>;
      }
      return (
        <div>
          {ports.map((p, i) => {
            const { port, protocol, path } = p;
            return (
              <div key={i}>{`${port}/${protocol}${path
                ? ` - ${path}`
                : ''}`}</div>
            );
          })}
        </div>
      );
    },
  },
  {
    field: 'operate',
    label: '操作',
    render() {
      return (
        <div className="btn-group dropdown">
          <button className="btn btn-sm btn-primary">开启</button>
          <button
            className="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-icon"
            data-toggle="dropdown"
          >
            <i className="dropdown-caret" />
          </button>
          <ul className="dropdown-menu">
            <li>
              <a href="javascript:void(0)">删除</a>
            </li>
          </ul>
        </div>
      );
    },
  },
];

const gridData = {
  msg: '',
  results: {
    data: [
      {
        name: 'application',
        image:
          'registry.cn-beijing.aliyuncs.com/cabernety/application-server:v1.0',
        memory: '0',
        cpu: '0',
        ports: [
          { name: '', protocol: 'tcp', port: 8080, path: '/v1/application' },
        ],
      },
      {
        name: 'ceph',
        image: '',
        memory: '',
        cpu: '',
        ports: [{ name: '', protocol: 'tcp', port: 5000, path: '' }],
      },
      {
        name: 'default-http-backend',
        image: 'registry.cn-beijing.aliyuncs.com/cabernety/defaultbackend:1.0',
        memory: '20Mi',
        cpu: '10m',
        ports: [{ name: '', protocol: 'tcp', port: 80, path: '' }],
      },
      {
        name: 'elasticsearch',
        image: '',
        memory: '',
        cpu: '',
        ports: [{ name: 'http', protocol: 'tcp', port: 9200, path: '' }],
      },
      {
        name: 'email',
        image: 'registry.cn-beijing.aliyuncs.com/cabernety/email-server:latest',
        memory: '0',
        cpu: '0',
        ports: [{ name: '', protocol: 'tcp', port: 8080, path: '/v1/email' }],
      },
      {
        name: 'index',
        image: '',
        memory: '',
        cpu: '',
        ports: [
          { name: 'index', protocol: 'tcp', port: 5000, path: '/' },
          { name: 'auth', protocol: 'tcp', port: 5001, path: '/auth' },
        ],
      },
      {
        name: 'kibana',
        image: '',
        memory: '',
        cpu: '',
        ports: [{ name: 'http', protocol: 'tcp', port: 5601, path: '' }],
      },
      {
        name: 'kube-dns',
        image: '',
        memory: '',
        cpu: '',
        ports: [
          { name: 'dns', protocol: 'tcp', port: 53, path: '' },
          { name: 'dns-tcp', protocol: 'tcp', port: 53, path: '' },
        ],
      },
      {
        name: 'mariadb',
        image: '',
        memory: '',
        cpu: '',
        ports: [
          { name: 'mysql', protocol: 'tcp', port: 3306, path: '' },
          { name: 'sst', protocol: 'tcp', port: 4444, path: '' },
          { name: 'replication', protocol: 'tcp', port: 4567, path: '' },
          { name: 'replicationudp', protocol: 'tcp', port: 4567, path: '' },
          { name: 'ist', protocol: 'tcp', port: 4568, path: '' },
        ],
      },
      {
        name: 'mysql',
        image: '',
        memory: '',
        cpu: '',
        ports: [{ name: 'mysql', protocol: 'tcp', port: 3306, path: '' }],
      },
    ],
    pagination: { currentPage: 1, pageCount: 10, totalCount: 19 },
  },
  status: 0,
};

export default class GridDemo extends React.Component {
  render() {
    return <Grid columns={columns} data={gridData.results} />;
  }
}
