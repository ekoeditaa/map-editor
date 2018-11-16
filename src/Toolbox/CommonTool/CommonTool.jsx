import React, { PureComponent } from 'react';
import memo from 'memoize-one';
import cx from 'classnames';
import { computeStyle, getNextMap } from './utils';
import styles from './CommonTool.module.scss';

class CommonTool extends PureComponent {
  state = {
    selected: null,
  };

  getListeners = memo(() => ({
    onClick: this.handleClick,
    onMouseEnter: this.handleMouseOver,
  }))

  componentDidMount() {
    window.addEventListener('keyup', this.handleEscape);
    const { isActive, setListeners } = this.props;
    if (isActive) setListeners(this.getListeners());
  }

  componentDidUpdate(prevProps) {
    const { isActive, setListeners } = this.props;

    if (!prevProps.isActive && isActive) setListeners(this.getListeners());
    if (prevProps.isActive && !isActive) {
      this.clear();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  clear = () => {
    this.setState({ selected: null });
    this.props.setCellStyles({});
  }

  handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.clear();
    }
  }

  handleClick = (row, col) => {
    const { map, setMap, type } = this.props;
    const { selected } = this.state;

    if (selected) {
      const nextMap = getNextMap(map, selected, [row, col], type);
      setMap(nextMap);
      this.clear();
    } else {
      this.setState({ selected: [row, col] });
    }
  }

  handleMouseOver = (row, col) => {
    const { selected } = this.state;
    const { setCellStyles } = this.props;
    if (!selected) return;

    const style = computeStyle(selected, [row, col]);
    setCellStyles(style);
  }

  activate = () => {
    const { setActive, type } = this.props;
    setActive(type);
  }

  render() {
    const { isActive, icon } = this.props;

    return (
      <button
        onClick={this.activate}
        className={cx( styles.CommonTool, {
          [styles.active]: isActive,
        })}
      >
        {icon}
      </button>
    );
  }
}

CommonTool.propTypes = {};

export default CommonTool;
