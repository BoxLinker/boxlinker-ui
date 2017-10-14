import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, isObject, isArray } from 'lodash';

const DEFAULT_PAGE_COUNT = 10;
/* eslint-disable no-debugger */
export default class Grid extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string.isRequired,
        label: PropTypes.string,
        minWidth: PropTypes.bool,
        width: PropTypes.number,
        render: PropTypes.func,
      }).isRequired,
    ).isRequired,
    data: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      pagination: PropTypes.shape({
        currentPage: PropTypes.number,
        pageCount: PropTypes.number,
        totalCount: PropTypes.number,
      }),
    }),
    onLoad: PropTypes.func,
  };
  static defaultProps = {
    data: [],
    pagination: {
      currentPage: -1,
      pageCount: -1,
      totalCount: -1,
    },
    onLoad: () => {},
  };
  onLoadPage = ({ target: { dataset } }) => {
    const { currentPage } = dataset;
    const { pageCount } = this.props.data.pagination;
    this.props.onLoad({
      currentPage,
      pageCount,
    });
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
    return results.map(item => {
      const tds = columns.map(column => {
        let value = item[column.field];
        if ((isObject(value) || isArray(value)) && !isFunction(column.render)) {
          value = JSON.stringify(value);
        }
        return (
          <td key={column.field}>
            {isFunction(column.render) ? column.render(value, item) : value}
          </td>
        );
      });
      return <tr key={item.name}>{tds}</tr>;
    });
  }
  getPagination() {
    /* eslint-disable no-script-url */
    const { data } = this.props;
    if (!data || !data.pagination) {
      return null;
    }
    const { currentPage, pageCount, totalCount } = data.pagination;
    let pPageCount = pageCount;
    if (pPageCount <= 0) {
      pPageCount = DEFAULT_PAGE_COUNT;
    }
    const pageNum = Math.ceil(totalCount / pPageCount);
    const pages = [];
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage >= pageNum;
    for (let i = 0; i < pageNum; i += 1) {
      pages.push(
        <li
          key={i}
          className={`page-number ${i + 1 === currentPage ? 'active' : ''}`}
        >
          <a
            href="javascript:void(0)"
            data-current-page={i + 1}
            onClick={this.onLoadPage}
          >
            {i + 1}
          </a>
        </li>,
      );
    }
    return (
      <div className="clearfix">
        <span className="pull-left" style={{ margin: '20px 0' }}>
          共 {totalCount} 条,&nbsp; 当前 {(currentPage - 1) * pPageCount + 1} -
          {currentPage * pPageCount} 条
        </span>
        <ul className="pagination pull-right">
          {!isFirstPage ? (
            <li className="page-pre">
              <a href="javascript:void(0)">
                <i className="fa fa-angle-left" />
              </a>
            </li>
          ) : null}
          {pages}
          {!isLastPage ? (
            <li className="page-next">
              <a href="javascript:void(0)">
                <i className="fa fa-angle-right" />
              </a>
            </li>
          ) : null}
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
        {this.getPagination()}
      </div>
    );
  }
}
