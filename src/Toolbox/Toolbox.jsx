import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ObstacleTool from './ObstacleTool';
import WalkwayTool from './WalkwayTool';
import MarkTool from './MarkTool';
import IntersectionTool from './IntersectionTool';
import { CellTypes } from '../App/utils';
import styles from './Toolbox.module.scss';

const tools = [
  CellTypes.WALKWAY,
  CellTypes.OBSTACLE,
  CellTypes.MARK,
  CellTypes.INTERSECTION,
];

const Components = {
  [CellTypes.WALKWAY]: WalkwayTool,
  [CellTypes.OBSTACLE]: ObstacleTool,
  [CellTypes.MARK]: MarkTool,
  [CellTypes.INTERSECTION]: IntersectionTool,
};

class Toolbox extends PureComponent {
  state = {
    active: CellTypes.WALKWAY,
    listeners: {},
  };

  setActive = active => this.setState({ active });

  setListeners = listeners => this.setState({ listeners });

  renderTools = () => tools.map((toolType) => {
    const { active } = this.state;
    const Component = Components[toolType];
    const isActive = active === toolType;

    return (
      <Component
        key={toolType}
        setActive={this.setActive}
        isActive={isActive}
        setListeners={this.setListeners}
        {...this.props}
      />
    );
  })

  render() {
    const { children } = this.props;
    const { active, listeners } = this.state;

    return (
      <Fragment>
        <div className={styles.Toolbox}>
          {this.renderTools(active)}
        </div>
        {children(listeners)}
      </Fragment>
    );
  }
}

Toolbox.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Toolbox;
