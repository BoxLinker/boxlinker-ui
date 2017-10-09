import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Select extends React.Component {
  constructor(props) {
    super(props);

    // 属性
    ['onSearchInputChange', 'onItemClick'].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
  }
  onItemClick(e) {
    const item = this.getDataItemByValue(e.target.dataset.selectValue);
    this.props.onItemClick(item);
  }
  onSearchInputChange(e) {
    this.props.onSearchInputChange(e);
  }
  getLabelByValue(value) {
    const data = this.props.data;
    const l = data.length;
    const v = this.props.valueKey;
    const k = this.props.labelKey;
    if (!l) {
      return this.props.placeholder;
    }
    for (let i = 0; i < l; i += 1) {
      const d = data[i];
      if (d[v] === value) {
        return d[k];
      }
    }
    return this.props.placeholder;
  }
  getClearIcon() {
    return this.props.clearIcon ? (
      <span className="bui-select-renderer-clear">x</span>
    ) : null;
  }
  getDataItemByValue(value) {
    const data = this.props.data;
    const l = data.length;
    const key = this.props.valueKey;
    for (let i = 0; i < l; i += 1) {
      /* eslint-disable eqeqeq */
      if (data[i][key] == value) {
        return data[i];
      }
    }
    return null;
  }
  getSearchInner() {
    return (
      <input
        className="form-control"
        placeholder={this.props.placeholder}
        defaultValue=""
        onChange={this.onSearchInputChange}
      />
    );
  }
  getDropdownBody() {
    const data = this.props.data;
    let search = (
      <div className="bui-dropdown-search">{this.getSearchInner()}</div>
    );

    if (!this.props.searchable) {
      search = null;
    }
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    const items = data.map(item => (
      <li
        onClick={this.onItemClick}
        data-select-value={item[this.props.valueKey]}
        className="bui-dropdown-results-option"
        key={item[this.props.valueKey]}
      >
        {this.props.getLabel
          ? this.props.getLabel(item)
          : item[this.props.labelKey]}
      </li>
    ));
    return (
      <div>
        {search}
        <div className="bui-dropdown-results">
          <ul className="bui-dropdown-results-options">{items}</ul>
        </div>
      </div>
    );
  }
  render() {
    const itemV = this.getDataItemByValue(this.props.value);
    let labelText = '';
    if (!itemV || !this.props.getLabel) {
      labelText = this.getLabelByValue(this.props.value);
    } else {
      labelText = this.props.getLabel(itemV);
    }
    return (
      <div
        style={this.props.style}
        className={cx(
          'bui-select',
          this.props.searchable ? 'bui-select-searchable' : '',
        )}
      >
        <div
          className={cx('bui-select-wrapper', this.props.open ? 'open' : '')}
        >
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <div
            className="dropdown bui-selection"
            data-toggle="dropdown"
            onClick={this.toggle}
          >
            <div className="bui-select-renderer">
              {this.getClearIcon()}
              {labelText}
            </div>
            <div className="bui-select-arrow">
              <b />
            </div>
          </div>
          <div className={cx('dropdown-menu', 'bui-dropdown')}>
            {this.getDropdownBody()}
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types,react/no-unused-prop-types,react/require-default-props */
Select.propTypes = {
  clearIcon: PropTypes.bool,
  data: PropTypes.array,
  getLabel: PropTypes.func,
  labelKey: PropTypes.string,
  onItemClick: PropTypes.func,
  onSearchInputChange: PropTypes.func,
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  searchText: PropTypes.string,
  searchable: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.any,
  valueKey: PropTypes.string,
};

Select.defaultProps = {
  clearIcon: false,
  valueKey: 'value',
  labelKey: 'label',
  searchText: '',
  getLabel: null,
  onSearchInputChange: () => {},
  onItemClick: () => {},
  open: false,
  data: [],
  searchable: false,
  placeholder: '请选择',
};

export default Select;
