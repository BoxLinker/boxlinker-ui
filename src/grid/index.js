import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';

const DEFAULT_PAGE_COUNT = 10;

export default class Grid extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string,
        label: PropTypes.string,
        minWidth: PropTypes.bool,
        width: PropTypes.number,
        render: PropTypes.func,
      }),
    ).isRequired,
    data: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      pagination: PropTypes.shape({
        currentPage: PropTypes.number,
        pageCount: PropTypes.number,
        totalCount: PropTypes.number,
      }),
    }),
  };
  static defaultProps = {
    data: [],
    pagination: {
      currentPage: -1,
      pageCount: -1,
      totalCount: -1,
    },
  };
  getHead() {
    const { columns } = this.props;
    if (!columns) {
      return null;
    }
    return (
      <tr>
        {columns.map(colume => {
          const style = {};
          if (colume.width > 0) {
            style.width = `${colume.width}px`;
          }
          return (
            <th
              key={colume.field}
              className={`${colume.minWidth ? 'min-width' : ''}`}
              style={style}
            >
              {colume.label}
            </th>
          );
        })}
      </tr>
    );
  }
  getBody() {
    const { columns, data } = this.props;
    const results = data.data;
    if (!results) {
      return null;
    }
    const columesMap = {};
    columns.forEach(colume => {
      columesMap[colume.field] = colume;
    });
    return results.map((item, key) => {
      const tds = [];
      columns.forEach(colume => {
        const value = item[colume.field];
        const comp = isFunction(colume.render) ? colume.render(value) : value;
        tds.push(<td key={colume.field}>{comp}</td>);
      });
      return <tr key={key}>{tds}</tr>;
    });
  }
  getPagination() {
    /* eslint-disable no-script-url */
    const { data } = this.props;
    const { currentPage, pageCount, totalCount } = data.pagination;
    let pPageCount = pageCount;
    if (pPageCount <= 0) {
      pPageCount = DEFAULT_PAGE_COUNT;
    }
    const pageNum = Math.ceil(totalCount / pPageCount);
    const pages = [];
    for (let i = 0; i < pageNum; i += 1) {
      pages.push(
        <li
          key={i}
          className={`page-number ${i + 1 === currentPage ? 'active' : ''}`}
        >
          <a href="javascript:void(0)">{i + 1}</a>
        </li>,
      );
    }
    return (
      <div className="clearfix">
        <span className="pull-left">
          共{totalCount},
          {(currentPage - 1) * pPageCount + 1} -
          {currentPage * pPageCount + 1}
        </span>
        <ul className="pagination pull-right">
          <li className="page-pre">
            <a href="javascript:void(0)">
              <i className="fa fa-arrow-left" />
            </a>
          </li>
          {pages}
          <li className="page-next">
            <a href="javascript:void(0)">
              <i className="fa fa-arrow-right" />
            </a>
          </li>
        </ul>
      </div>
    );
  }
  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>{this.getHead()}</thead>
          <tbody>{this.getBody()}</tbody>
        </table>
      </div>
    );
  }
}
