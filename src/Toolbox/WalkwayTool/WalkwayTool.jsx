import React, { PureComponent } from 'react';
import memo from 'memoize-one';
import cx from 'classnames';
import { computeStyle, getNextMap } from './utils';

class WalkwayTool extends PureComponent {
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
    const { isActive, setListeners, setCellStyles } = this.props;

    if (!prevProps.isActive && isActive) setListeners(this.getListeners());
    if (prevProps.isActive && !isActive) {
      this.setState({ selected: null });
      setCellStyles({});
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.setState({ selected: null });
    }
  }

  handleClick = (row, col) => {
    const { map, setMap, setCellStyles } = this.props;
    const { selected } = this.state;

    if (selected) {
      const nextMap = getNextMap(map, selected, [row, col]);
      setMap(nextMap);
      this.setState({ selected: null });
      setCellStyles({});
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

  render() {
    const { setActive, isActive } = this.props;

    return (
      <button
        onClick={setActive}
        className={cx({ active: isActive })}
      >
        W
      </button>
    );
  }
}

WalkwayTool.propTypes = {};

export default WalkwayTool;
