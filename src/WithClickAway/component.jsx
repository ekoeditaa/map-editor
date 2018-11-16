import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

class WithClickAway extends Component {
  componentDidMount() {
    window.addEventListener('mouseup', this.handleClickAway);
    window.addEventListener('touchend', this.handleClickAway);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleClickAway);
    window.removeEventListener('touchend', this.handleClickAway);
  }

  handleClickAway = (e) => {
    if (this.props.disabled) return;

    // Ignore events that have been `event.preventDefault()` marked.
    if (e.defaultPrevented) {
      return;
    }

    // The child might render null.
    if (!this.node) {
      return;
    }

    if (!this.node.contains(e.target)) {
      this.props.onClickAway(e);
    }
  }

  render() {
    return cloneElement(
      Children.only(this.props.children),
      { ref: (node) => { this.node = node; } },
    );
  }
}

WithClickAway.defaultProps = {
  disabled: false,
};

WithClickAway.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onClickAway: PropTypes.func.isRequired,
};

export default WithClickAway;
