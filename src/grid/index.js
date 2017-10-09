import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';

export default class Grid extends React.Component {
  static propTypes = {
    columes: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string,
        label: PropTypes.string,
        minWidth: PropTypes.bool,
        width: PropTypes.number,
        render: PropTypes.func,
      }),
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    data: [],
  };
  getHead() {
    const { columes } = this.props;
    return (
      <tr>
        {columes.map(colume => {
          const style = {};
          if (colume.width > 0) {
            style.width = `${colume.width}px`;
          }
          return (
            <th
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
    const { columes, data } = this.props;
    const columesMap = {};
    columes.forEach(colume => {
      columesMap[colume.field] = colume;
    });
    return data.map(item => {
      const tds = [];
      columes.forEach(colume => {
        const value = item[colume.field];
        const comp = isFunction(colume.render) ? colume.render(value) : value;
        tds.push(<td>{comp}</td>);
      });
      return <tr>{tds}</tr>;
    });
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
