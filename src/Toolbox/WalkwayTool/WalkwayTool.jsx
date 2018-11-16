import React from 'react';
import { CellTypes } from '../../App/utils';
import CommonTool from '../CommonTool';
import walkwayIcon from '../../assets/walkway_color.svg';
import walkwayIconInverted from '../../assets/walkway_inverted.svg';
import styles from './WalkwayTool.module.scss';

function WalkwayTool(props) {
  return (
    <CommonTool
      name="Walkway Tool"
      type={CellTypes.WALKWAY}
      icon={
        <img
          className={styles.icon}
          src={props.isActive
            ? walkwayIconInverted
            : walkwayIcon}
          alt="walkway"
        />
      }
      {...props}
    />
  );
}

WalkwayTool.propTypes = {};

export default WalkwayTool;
