import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './GridCell.module.scss';

class GridCell extends PureComponent {
  proxyListeners = (listeners) => {
    const { row, col } = this.props;
    const result = {};

    Object
      .entries(listeners)
      .forEach(([key, handler]) => {
        result[key] = e => handler(row, col, e);
      });

    return result;
  }

  render() {
    const {
      listeners,
      value,
      style,
    } = this.props;

    const proxied = this.proxyListeners(listeners);

    return (
      <td
        {...proxied}
        style={style}
        className={styles.GridCell}
      >
        {value}
      </td>
    );
  }
}

GridCell.propTypes = {
  listeners: PropTypes.objectOf(PropTypes.func).isRequired,
  style: PropTypes.object,
};

export default GridCell;
